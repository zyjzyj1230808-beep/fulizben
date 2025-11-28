"use client";

import React, { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

type StudyStatus = 'pending' | 'approved' | 'rejected';

interface SubmissionRecord {
  id: string;
  file_path: string;
  status: StudyStatus;
  created_at: string;
  profile: {
    email: string;
    nickname: string | null;
    role: string;
    study_status?: StudyStatus;
  } | null;
}

export default function MaterialReview({ supabase }: { supabase: SupabaseClient }) {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [subLoading, setSubLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState<string | null>(null);

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

  const authorizedFetch = useCallback(
    async (input: RequestInfo, init?: RequestInit) => {
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
    },
    [sessionToken]
  );

  const fetchSubmissions = useCallback(async () => {
    if (!sessionToken) return;
    setSubLoading(true);
    setError('');
    try {
      const result = await authorizedFetch('/api/admin/materials');
      setSubmissions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载资料失败');
    } finally {
      setSubLoading(false);
    }
  }, [sessionToken, authorizedFetch]);

  useEffect(() => {
    if (sessionToken) {
      fetchSubmissions();
    }
  }, [sessionToken, fetchSubmissions]);

  return (
    <section className="space-y-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800/50">
      <header className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">📋 资料审核</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            审核学员提交的学习资料，可以下载、通过或驳回
          </p>
        </div>
        <button
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors px-3 py-1.5 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
          onClick={fetchSubmissions}
          disabled={subLoading}
        >
          {subLoading ? '刷新中...' : '🔄 刷新'}
        </button>
      </header>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      {subLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mb-3"></div>
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12">
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
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {submission.profile?.email || submission.file_path}
                </p>
                {submission.profile?.nickname && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    昵称: {submission.profile.nickname}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  提交时间: {new Date(submission.created_at).toLocaleString('zh-CN')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  当前状态:{' '}
                  <span
                    className={`font-medium ${
                      submission.status === 'pending'
                        ? 'text-orange-600 dark:text-orange-400'
                        : submission.status === 'approved'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {submission.status === 'pending'
                      ? '待审核'
                      : submission.status === 'approved'
                      ? '已通过'
                      : '已驳回'}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 text-xs font-medium border-2 border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={async () => {
                    try {
                      const res = await authorizedFetch(
                        `/api/admin/materials?file=${encodeURIComponent(submission.file_path)}`
                      );
                      if (res.url) {
                        window.open(res.url, '_blank');
                      }
                    } catch (err) {
                      alert(err instanceof Error ? err.message : '下载失败');
                    }
                  }}
                >
                  📥 下载
                </button>
                {submission.status === 'pending' && (
                  <>
                    <button
                      className="px-4 py-2 text-xs font-medium border-2 border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
                      onClick={async () => {
                        try {
                          await authorizedFetch('/api/admin/materials', {
                            method: 'PATCH',
                            body: JSON.stringify({ id: submission.id, status: 'approved' }),
                          });
                          fetchSubmissions();
                          alert('审核通过');
                        } catch (err) {
                          alert(err instanceof Error ? err.message : '操作失败');
                        }
                      }}
                    >
                      ✓ 通过
                    </button>
                    <button
                      className="px-4 py-2 text-xs font-medium border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      onClick={async () => {
                        try {
                          await authorizedFetch('/api/admin/materials', {
                            method: 'PATCH',
                            body: JSON.stringify({ id: submission.id, status: 'rejected' }),
                          });
                          fetchSubmissions();
                          alert('已驳回');
                        } catch (err) {
                          alert(err instanceof Error ? err.message : '操作失败');
                        }
                      }}
                    >
                      ✗ 驳回
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
