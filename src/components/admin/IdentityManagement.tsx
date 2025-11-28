import React, { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

type UserRole = 'newbie' | 'trainee' | 'junior' | 'senior' | 'admin' | 'assistant';
type StudyStatus = 'pending' | 'approved' | 'rejected';

interface IdentityRecord {
  id: string;
  email: string;
  nickname: string | null;
  role: UserRole;
  study_status: StudyStatus;
  is_active: boolean;
  created_at?: string;
  last_sign_in_at?: string;
}

interface SubmissionRecord {
  id: string;
  file_path: string;
  status: StudyStatus;
  created_at: string;
  profile: {
    email: string;
    nickname: string | null;
    role: UserRole;
    study_status?: StudyStatus;
  } | null;
}

const roleLabels: Record<UserRole, string> = {
  newbie: '新学员',
  trainee: '见习学员',
  junior: '初级交易员',
  senior: '中级交易员',
  admin: '管理员',
  assistant: '助教',
};

export default function IdentityManagement({ supabase }: { supabase: SupabaseClient }) {
  const [identities, setIdentities] = useState<IdentityRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<IdentityRecord>>>({});
  const [createForm, setCreateForm] = useState({
    email: '',
    password: '',
    nickname: '',
    role: 'newbie' as UserRole,
  });
  const [savingRow, setSavingRow] = useState<string | null>(null);
  const [createError, setCreateError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [subLoading, setSubLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  const filtered = useMemo(() => {
    return identities.filter((item) => item.email.toLowerCase().includes(search.toLowerCase()));
  }, [identities, search]);

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSessionToken(data.session?.access_token ?? null);
    };
    initSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionToken(session?.access_token ?? null);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const fetchIdentities = async () => {
    if (!sessionToken) {
      // 如果还没有sessionToken，不显示错误，等待sessionToken加载
      return;
    }
    setLoading(true);
    setError(''); // 清除之前的错误
    try {
      const result = await authorizedFetch('/api/admin/identities');
      setIdentities(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载身份信息失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    if (!sessionToken) return;
    setSubLoading(true);
    try {
      const result = await authorizedFetch('/api/admin/materials');
      setSubmissions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载资料失败');
    } finally {
      setSubLoading(false);
    }
  };

  useEffect(() => {
    if (sessionToken) {
      fetchIdentities();
      fetchSubmissions();
    }
  }, [sessionToken]);

  const updateDraft = (id: string, field: keyof IdentityRecord, value: string | boolean) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const getDraftValue = <T,>(identity: IdentityRecord, field: keyof IdentityRecord): T => {
    return ((drafts[identity.id]?.[field] as T) ?? (identity[field] as T)) as T;
  };

  const hasChanges = (id: string) => Boolean(drafts[id] && Object.keys(drafts[id]!).length > 0);

  const authorizedFetch = async (input: RequestInfo, init?: RequestInit) => {
    if (!sessionToken) throw new Error('缺少管理员凭证，请重新登录');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
      ...(init?.headers || {}),
    };
    const response = await fetch(input, { ...init, headers });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || '请求失败');
    }
    return response.json();
  };

  const handleSave = async (identity: IdentityRecord) => {
    if (!hasChanges(identity.id)) return;
    setSavingRow(identity.id);
    try {
      const body = drafts[identity.id]!;
      await authorisedPatch(body, identity.id);
      setIdentities((prev) =>
        prev.map((item) => (item.id === identity.id ? { ...item, ...body } : item))
      );
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[identity.id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
    } finally {
      setSavingRow(null);
    }
  };

  const authorisedPatch = async (body: Partial<IdentityRecord>, id: string) => {
    await authorizedFetch('/api/admin/identities', {
      method: 'PATCH',
      body: JSON.stringify({ id, updates: body }),
    });
  };

  const handleResetPassword = async (identity: IdentityRecord) => {
    const newPassword = prompt(`请输入为 ${identity.email} 设置的新密码：`, '');
    if (!newPassword) return;
    try {
      await authorizedFetch('/api/admin/identities', {
        method: 'PUT',
        body: JSON.stringify({ id: identity.id, password: newPassword }),
      });
      alert('密码已重置');
    } catch (err) {
      alert(err instanceof Error ? err.message : '重置失败');
    }
  };

  const handleDelete = async (identity: IdentityRecord) => {
    const confirmed = confirm(`确定要删除身份 ${identity.email} 吗？此操作不可恢复！`);
    if (!confirmed) return;
    try {
      await authorizedFetch(`/api/admin/identities?id=${identity.id}`, {
        method: 'DELETE',
      });
      alert('删除成功');
      fetchIdentities();
    } catch (err) {
      alert(err instanceof Error ? err.message : '删除失败');
    }
  };

  const handleCreate = async () => {
    setCreateError('');
    setCreateLoading(true);
    try {
      await authorizedFetch('/api/admin/identities', {
        method: 'POST',
        body: JSON.stringify(createForm),
      });
      setCreating(false);
      setCreateForm({ email: '', password: '', nickname: '', role: 'newbie' });
      fetchIdentities();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : '创建失败');
    } finally {
      setCreateLoading(false);
    }
  };

  const fetchLogs = async () => {
    if (!sessionToken) return;
    setLogsLoading(true);
    try {
      const result = await authorizedFetch('/api/admin/logs');
      setLogs(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载操作日志失败');
    } finally {
      setLogsLoading(false);
    }
  };

  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).replace(/\//g, '/');
    } catch {
      return '-';
    }
  };

  return (
    <section className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6 md:p-8 space-y-6 rounded-lg shadow-lg">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            身份管理
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            管理会员邮箱、角色与启用状态，可创建新身份或重置密码。
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 shadow-sm"
            onClick={() => {
              setShowLogs(true);
              fetchLogs();
            }}
          >
            操作日志
          </button>
          <button
            className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setCreating(true)}
          >
            + 新增身份
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索邮箱..."
            className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-transparent text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
          />
        </div>
        <button
          onClick={fetchIdentities}
          className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
        >
          🔄 刷新
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                邮箱
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                昵称
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                角色
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                启用
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                资料状态
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                创建时间
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                最后登录
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-5 py-12 text-center" colSpan={8}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    <span className="text-gray-500 dark:text-gray-400">加载中...</span>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-5 py-12 text-center" colSpan={8}>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <span className="text-gray-500 dark:text-gray-400">暂无数据</span>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((identity, index) => {
                const draft = drafts[identity.id];
                const dirty = hasChanges(identity.id);
                return (
                  <tr
                    key={identity.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{identity.email}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                        ID: {identity.id.slice(0, 8)}...
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="text"
                        className="w-full min-w-[120px] border-2 border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                        value={getDraftValue<string>(identity, 'nickname') || ''}
                        onChange={(e) => updateDraft(identity.id, 'nickname', e.target.value)}
                        placeholder="输入昵称"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <select
                        className="w-full min-w-[120px] border-2 border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 cursor-pointer"
                        value={getDraftValue<UserRole>(identity, 'role')}
                        onChange={(e) => updateDraft(identity.id, 'role', e.target.value as UserRole)}
                      >
                        {Object.entries(roleLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={getDraftValue<boolean>(identity, 'is_active')}
                          onChange={(e) => updateDraft(identity.id, 'is_active', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:ring-offset-gray-800 focus:ring-offset-2 cursor-pointer"
                        />
                        <span
                          className={`text-sm font-medium ${
                            getDraftValue<boolean>(identity, 'is_active')
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {getDraftValue<boolean>(identity, 'is_active') ? '启用中' : '已停用'}
                        </span>
                      </label>
                    </td>
                    <td className="px-5 py-4">
                      {/* 资料状态：用于跟踪学员提交的学习资料的审核状态
                          - 待审核(pending): 学员已提交学习资料，等待管理员审核
                          - 已通过(approved): 管理员审核通过，学员可解锁更高权限
                          - 已驳回(rejected): 管理员审核不通过，学员需要重新提交
                          管理员可以在"资料审核"区域查看和审核学员提交的学习资料 */}
                      <select
                        className="w-full min-w-[100px] border-2 border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 cursor-pointer"
                        value={getDraftValue<StudyStatus>(identity, 'study_status')}
                        onChange={(e) =>
                          updateDraft(identity.id, 'study_status', e.target.value as StudyStatus)
                        }
                        title="资料状态：跟踪学员学习资料的审核进度"
                      >
                        <option value="pending">待审核</option>
                        <option value="approved">已通过</option>
                        <option value="rejected">已驳回</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                        {formatDateTime(identity.created_at)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                        {formatDateTime(identity.last_sign_in_at)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2 min-w-[100px]">
                        <button
                          className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                            dirty
                              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow'
                              : savingRow === identity.id
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                          }`}
                          disabled={!dirty || savingRow === identity.id}
                          onClick={() => handleSave(identity)}
                        >
                          {savingRow === identity.id ? '保存中...' : dirty ? '💾 保存' : '✓ 已保存'}
                        </button>
                        <button
                          className="w-full px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
                          onClick={() => handleResetPassword(identity)}
                        >
                          🔑 重置密码
                        </button>
                        <button
                          className="w-full px-3 py-1.5 text-xs font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 rounded-md shadow-sm hover:shadow transition-all duration-200"
                          onClick={() => handleDelete(identity)}
                        >
                          🗑️ 删除
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <section className="space-y-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800/50">
        <header className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">📋 资料审核</h3>
          <button
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors"
            onClick={fetchSubmissions}
            disabled={subLoading}
          >
            {subLoading ? '刷新中...' : '🔄 刷新'}
          </button>
        </header>
        {submissions.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">📄</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">暂无待处理的学习资料。</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200 shadow-sm hover:shadow"
              >
                <div>
                  <p className="font-semibold">
                    {submission.profile?.email || submission.file_path}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(submission.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 text-xs font-medium border-2 border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    onClick={async () => {
                      const res = await authorizedFetch(
                        `/api/admin/materials?file=${encodeURIComponent(submission.file_path)}`
                      );
                      if (res.url) {
                        window.open(res.url, '_blank');
                      }
                    }}
                  >
                    📥 下载
                  </button>
                  <button
                    className="px-4 py-2 text-xs font-medium border-2 border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
                    onClick={async () => {
                      await authorizedFetch('/api/admin/materials', {
                        method: 'PATCH',
                        body: JSON.stringify({ id: submission.id, status: 'approved' }),
                      });
                      fetchSubmissions();
                      fetchIdentities();
                    }}
                  >
                    ✓ 通过
                  </button>
                  <button
                    className="px-4 py-2 text-xs font-medium border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    onClick={async () => {
                      await authorizedFetch('/api/admin/materials', {
                        method: 'PATCH',
                        body: JSON.stringify({ id: submission.id, status: 'rejected' }),
                      });
                      fetchSubmissions();
                      fetchIdentities();
                    }}
                  >
                    ✗ 驳回
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {creating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border-2 border-black dark:border-white rounded-lg p-6 space-y-5 shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">创建新身份</h3>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">邮箱</label>
              <input
                type="email"
                className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                value={createForm.email}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">初始密码</label>
              <input
                type="password"
                className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                value={createForm.password}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="输入初始密码"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">昵称</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                value={createForm.nickname}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, nickname: e.target.value }))}
                placeholder="输入昵称（可选）"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">角色</label>
              <select
                className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 cursor-pointer"
                value={createForm.role}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, role: e.target.value as UserRole }))}
              >
                {Object.entries(roleLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {createError && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700 dark:text-red-400">{createError}</p>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => {
                  setCreating(false);
                  setCreateError('');
                }}
              >
                取消
              </button>
              <button
                className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={handleCreate}
                disabled={createLoading}
              >
                {createLoading ? '创建中...' : '✓ 创建'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogs && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-5xl max-h-[85vh] bg-white dark:bg-gray-900 border-2 border-black dark:border-white rounded-lg shadow-2xl p-6 space-y-5 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">📋 操作日志</h3>
              <button
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => {
                  setShowLogs(false);
                  setLogs([]);
                }}
              >
                ✕ 关闭
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
              {logsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mb-3"></div>
                  <p className="text-gray-500 dark:text-gray-400">加载中...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <span className="text-4xl mb-2">📝</span>
                  <p className="text-gray-500 dark:text-gray-400">暂无操作日志</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 sticky top-0">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        时间
                      </th>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        操作者
                      </th>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        操作类型
                      </th>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        目标邮箱
                      </th>
                      <th className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        详情
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log: any) => (
                      <tr
                        key={log.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <td className="px-5 py-3 text-xs font-mono text-gray-600 dark:text-gray-400">
                          {formatDateTime(log.created_at)}
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">
                          {log.actor?.email || log.actor?.nickname || '未知'}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              log.action === 'create_user'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : log.action === 'update_profile'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                : log.action === 'reset_password'
                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                : log.action === 'delete_user'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                            }`}
                          >
                            {log.action === 'create_user'
                              ? '创建用户'
                              : log.action === 'update_profile'
                              ? '更新资料'
                              : log.action === 'reset_password'
                              ? '重置密码'
                              : log.action === 'delete_user'
                              ? '删除用户'
                              : log.action}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600 dark:text-gray-400">
                          {log.target_email || '-'}
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-500 font-mono">
                          {log.detail ? JSON.stringify(log.detail).slice(0, 50) + '...' : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

