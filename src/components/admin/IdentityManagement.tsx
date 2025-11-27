import React, { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';

type UserRole = 'newbie' | 'trainee' | 'junior' | 'senior' | 'admin';
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
};

export default function IdentityManagement() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return (
      <section className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Supabase 未配置，暂时无法加载身份管理功能。
        </p>
      </section>
    );
  }
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
  }, []);

  const fetchIdentities = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, email, nickname, role, study_status, is_active, created_at');

    if (fetchError || !data) {
      setError(fetchError?.message || '加载身份信息失败');
    } else {
      const mapped: IdentityRecord[] = data.map((item) => ({
        ...item,
        id: item.id,
        last_sign_in_at: undefined,
      }));
      setIdentities(mapped);
    }
    setLoading(false);
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

  useEffect(() => {
    fetchIdentities();
  }, []);

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

  return (
    <section className="border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6 space-y-4">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black">身份管理</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            管理会员邮箱、角色与启用状态，可创建新身份或重置密码。
          </p>
        </div>
        <button
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold"
          onClick={() => setCreating(true)}
        >
          新增身份
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索邮箱"
          className="flex-1 border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent text-sm"
        />
        <button
          onClick={fetchIdentities}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm"
        >
          刷新
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="overflow-auto">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">邮箱</th>
              <th className="px-4 py-2 text-left">昵称</th>
              <th className="px-4 py-2 text-left">角色</th>
              <th className="px-4 py-2 text-left">启用</th>
              <th className="px-4 py-2 text-left">资料状态</th>
              <th className="px-4 py-2 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-center" colSpan={6}>
                  加载中...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center" colSpan={6}>
                  暂无数据
                </td>
              </tr>
            ) : (
              filtered.map((identity) => {
                const draft = drafts[identity.id];
                const dirty = hasChanges(identity.id);
                return (
                  <tr key={identity.id} className="border-t border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{identity.email}</div>
                      <div className="text-xs text-gray-500">ID: {identity.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1"
                        value={getDraftValue<string>(identity, 'nickname') || ''}
                        onChange={(e) => updateDraft(identity.id, 'nickname', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1"
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
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={getDraftValue<boolean>(identity, 'is_active')}
                          onChange={(e) => updateDraft(identity.id, 'is_active', e.target.checked)}
                        />
                        {getDraftValue<boolean>(identity, 'is_active') ? '启用中' : '已停用'}
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="w-full border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-1"
                        value={getDraftValue<StudyStatus>(identity, 'study_status')}
                        onChange={(e) =>
                          updateDraft(identity.id, 'study_status', e.target.value as StudyStatus)
                        }
                      >
                        <option value="pending">待审核</option>
                        <option value="approved">已通过</option>
                        <option value="rejected">已驳回</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 space-y-2">
                      <button
                        className="w-full px-3 py-1 text-xs border border-gray-300 dark:border-gray-600"
                        disabled={!dirty || savingRow === identity.id}
                        onClick={() => handleSave(identity)}
                      >
                        {savingRow === identity.id ? '保存中...' : dirty ? '保存' : '已保存'}
                      </button>
                      <button
                        className="w-full px-3 py-1 text-xs text-red-600 dark:text-red-400 border border-red-200"
                        onClick={() => handleResetPassword(identity)}
                      >
                        重置密码
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <section className="space-y-3 border border-gray-200 dark:border-gray-800 p-4">
        <header className="flex items-center justify-between">
          <h3 className="font-bold text-lg">资料审核</h3>
          <button
            className="text-sm underline"
            onClick={fetchSubmissions}
            disabled={subLoading}
          >
            {subLoading ? '刷新中...' : '刷新'}
          </button>
        </header>
        {submissions.length === 0 ? (
          <p className="text-sm text-gray-500">暂无待处理的学习资料。</p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
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
                    className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600"
                    onClick={async () => {
                      const res = await authorizedFetch(
                        `/api/admin/materials?file=${encodeURIComponent(submission.file_path)}`
                      );
                      if (res.url) {
                        window.open(res.url, '_blank');
                      }
                    }}
                  >
                    下载
                  </button>
                  <button
                    className="px-3 py-1 text-xs border border-green-300 text-green-600"
                    onClick={async () => {
                      await authorizedFetch('/api/admin/materials', {
                        method: 'PATCH',
                        body: JSON.stringify({ id: submission.id, status: 'approved' }),
                      });
                      fetchSubmissions();
                      fetchIdentities();
                    }}
                  >
                    通过
                  </button>
                  <button
                    className="px-3 py-1 text-xs border border-red-300 text-red-600"
                    onClick={async () => {
                      await authorizedFetch('/api/admin/materials', {
                        method: 'PATCH',
                        body: JSON.stringify({ id: submission.id, status: 'rejected' }),
                      });
                      fetchSubmissions();
                      fetchIdentities();
                    }}
                  >
                    驳回
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {creating && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-6 space-y-4">
            <h3 className="text-xl font-black">创建新身份</h3>
            <div className="space-y-2">
              <label className="text-sm font-semibold">邮箱</label>
              <input
                type="email"
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent"
                value={createForm.email}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">初始密码</label>
              <input
                type="password"
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent"
                value={createForm.password}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">昵称</label>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent"
                value={createForm.nickname}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, nickname: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">角色</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent"
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
            {createError && <p className="text-sm text-red-500">{createError}</p>}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-400 text-sm"
                onClick={() => {
                  setCreating(false);
                  setCreateError('');
                }}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-black text-white text-sm"
                onClick={handleCreate}
                disabled={createLoading}
              >
                {createLoading ? '创建中...' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

