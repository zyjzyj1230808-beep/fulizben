"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrandName from '@/components/custom/BrandName';
import { useLanguage } from '@/contexts/LanguageContext';
import TiantiPanel from '@/app/[locale]/(portal)/dashboard/components/TiantiPanel';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { UploadCloud, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { SupabaseClient } from '@supabase/supabase-js';

const AUTH_STORAGE_KEY = 'fuli_system_authenticated';
const PROFILE_STORAGE_KEY = 'fuli_system_profile';

type UserRole = 'newbie' | 'trainee' | 'junior' | 'senior' | 'admin' | 'assistant';
type StudyStatus = 'pending' | 'approved' | 'rejected';

interface UserProfile {
  id: string;
  role: UserRole;
  studyStatus: StudyStatus;
  email: string;
}

const materialBlocks = [
  {
    titleZh: '知识库总览',
    titleEn: 'Knowledge Repository',
    descZh: '集中管理宏观、策略、风控、心理四大维度资料，支持全文检索与标签筛选。',
    descEn: 'Centralized macro, strategy, risk and psychology resources with full-text search and tagging.',
    accent: 'from-[#1a3dff]/15 via-transparent to-transparent',
  },
  {
    titleZh: '数据快照',
    titleEn: 'Data Snapshots',
    descZh: '日报形式同步要闻、经济数据、交易员点评，一键输出学习笔记。',
    descEn: 'Daily briefs with key news, econ releases and trader commentary; export notes instantly.',
    accent: 'from-[#00c2ff]/15 via-transparent to-transparent',
  },
  {
    titleZh: '内部工具',
    titleEn: 'Internal Toolkit',
    descZh: '提供进度追踪、材料下载记录、收藏夹等辅助功能，方便回顾。',
    descEn: 'Progress tracking, download logs and favorites streamline review sessions.',
    accent: 'from-[#8b5cff]/15 via-transparent to-transparent',
  },
];

const courseStages = [
  {
    stageZh: '01｜基础框架',
    stageEn: '01｜Foundations',
    descZh: '结构化拆解行情驱动力与交易流程，配套可交互练习。',
    descEn: 'Structured walkthrough of market drivers and trading workflow with interactive drills.',
  },
  {
    stageZh: '02｜策略深潜',
    stageEn: '02｜Strategy Lab',
    descZh: '多策略模块（趋势、套利、量化）按项目制输出，强调评估与复盘。',
    descEn: 'Project-based modules across trend, arbitrage and quant with evaluation & debriefs.',
  },
  {
    stageZh: '03｜联合演练',
    stageEn: '03｜Joint Simulations',
    descZh: '跨团队实战演练，结合情景题与指挥席反馈，考核协同效率。',
    descEn: 'Team simulations with scenario prompts and command-desk feedback to test cohesion.',
  },
];


const IdentityManagement = dynamic(
  () => import('@/components/admin/IdentityManagement'),
  { ssr: false }
);

const MaterialReview = dynamic(
  () => import('@/components/admin/MaterialReview'),
  { ssr: false }
);

interface StudyMaterial {
  id: string;
  file_path: string;
  status: StudyStatus;
  created_at: string;
}

const roleLabels: Record<UserRole, { zh: string; en: string }> = {
  newbie: { zh: '新学员', en: 'New Trainee' },
  trainee: { zh: '见习学员', en: 'Junior Trainee' },
  junior: { zh: '初级交易员', en: 'Junior Trader' },
  senior: { zh: '中级交易员', en: 'Senior Trader' },
  admin: { zh: '管理员', en: 'Admin' },
  assistant: { zh: '助教', en: 'Assistant' },
};

export default function FuliSystemPage() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-6 text-center space-y-3">
          <p className="text-lg font-bold">Supabase 未配置</p>
          <p className="text-sm text-gray-300">
            请在 .env.local 中设置 NEXT_PUBLIC_SUPABASE_URL 与 NEXT_PUBLIC_SUPABASE_ANON_KEY。
          </p>
        </div>
      </div>
    );
  }
  return <FuliSystemPageInner supabase={supabase} />;
}

function FuliSystemPageInner({ supabase }: { supabase: SupabaseClient }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('materials');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const profileId = userProfile?.id || null;

  useEffect(() => {
    const restoreSession = async () => {
      const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (cachedProfile) {
        const parsed: UserProfile = JSON.parse(cachedProfile);
        setUserProfile(parsed);
        setIsAuthenticated(true);
        if (parsed.id) {
          await fetchMaterials(parsed.id);
        }
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        await fetchProfile(data.session.user.id);
        setIsAuthenticated(true);
      } else {
        setLoadingProfile(false);
      }
    };

    restoreSession();
  }, [supabase]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('email, role, study_status')
      .eq('id', userId)
      .single();

    if (!error && data) {
      const profile: UserProfile = {
        id: userId,
        email: data.email,
        role: data.role as UserRole,
        studyStatus: data.study_status as StudyStatus,
      };
      setUserProfile(profile);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      await fetchMaterials(userId);
    }
    setLoadingProfile(false);
  };

  const fetchMaterials = async (userId: string) => {
    const { data } = await supabase
      .from('study_materials')
      .select('id, file_path, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) {
      setMaterials(data as StudyMaterial[]);
    }
  };

  const handleMaterialUpload = async (file: File) => {
    if (!profileId || !userProfile) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['doc', 'docx', 'pdf'].includes(ext)) {
      setUploadError(isZh ? '仅支持 DOC/DOCX/PDF 文件' : 'Only DOC/DOCX/PDF allowed');
      return;
    }
    setUploading(true);
    setUploadError('');
    const filePath = `${userProfile.email}/${Date.now()}-${file.name}`;
    const { error: uploadErr } = await supabase.storage
      .from('study-materials')
      .upload(filePath, file, { upsert: true });
    if (uploadErr) {
      setUploadError(uploadErr.message);
      setUploading(false);
      return;
    }
    const { error: insertErr } = await supabase.from('study_materials').insert({
      user_id: profileId,
      file_path: filePath,
      status: 'pending',
    });
    if (insertErr) {
      setUploadError(insertErr.message);
      setUploading(false);
      return;
    }
    await fetchMaterials(profileId);
    setUploading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    setUserProfile(null);
    setIsAuthenticated(false);
  };

  // 助教和管理员都可以查看课程系统
  const canViewCourses = userProfile ? userProfile.role !== 'newbie' : false;
  // 天网系统：只有初级交易员、中级交易员和管理员可以访问，助教不能访问
  const canViewQuant =
    userProfile && ['junior', 'senior', 'admin'].includes(userProfile.role);
  // 管理员和助教都可以审核资料
  const canReviewMaterials = userProfile && ['admin', 'assistant'].includes(userProfile.role);
  const isAdmin = userProfile?.role === 'admin';

  const accessibleTabs = useMemo(
    () => [
      {
        value: 'materials',
        label: isZh ? '资料系统' : 'Knowledge System',
        visible: true,
      },
      {
        value: 'courses',
        label: isZh ? '课程系统' : 'Course System',
        visible: !!canViewCourses,
      },
      {
        value: 'review',
        label: isZh ? '资料审核' : 'Material Review',
        visible: !!canReviewMaterials,
      },
      {
        value: 'tianti',
        label: isZh ? '量化天网' : 'Quant Net',
        visible: !!canViewQuant,
      },
    ],
    [isZh, canViewCourses, canViewQuant, canReviewMaterials]
  );

  useEffect(() => {
    const firstVisible = accessibleTabs.find((tab) => tab.visible)?.value ?? 'materials';
    setActiveTab(firstVisible);
  }, [accessibleTabs]);

  if (!isAuthenticated) {
    return (
      <FuliSystemLogin
        supabase={supabase}
        isZh={isZh}
        onAuthenticate={(profile) => {
          setUserProfile(profile);
          setIsAuthenticated(true);
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        }}
        storageKey={AUTH_STORAGE_KEY}
      />
    );
  }

  if (loadingProfile && !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>{isZh ? '加载中...' : 'Loading profile...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              <BrandName /> {isZh ? '浮力系统' : 'Fuli System'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isZh
                ? '浮力财富合作伙伴专属的权限系统，根据角色解锁资料、课程与量化天网。'
                : 'Role-based access console for Fuli Wealth partners covering knowledge, courses, and quant net.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* 只有管理员身份才能看到身份管理按钮 */}
            {isAdmin && userProfile?.role === 'admin' && (
              <button
                onClick={() => {
                  // 双重检查：确保用户确实是管理员
                  if (userProfile?.role === 'admin') {
                    setActiveTab('identity');
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-300 dark:border-gray-600 rounded-md hover:border-blue-500 dark:hover:border-blue-400"
                title={isZh ? '管理员专用：身份管理' : 'Admin Only: Identity Management'}
              >
                {isZh ? '身份管理' : 'Identity Admin'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t('dashboard.logout')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {userProfile && (
          <div className="mb-6 rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6">
            <p className="font-black text-lg">
              {isZh ? '当前权限：' : 'Current Role: '}
              <span className="text-blue-600 dark:text-blue-300">
                {isZh ? roleLabels[userProfile.role].zh : roleLabels[userProfile.role].en}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {userProfile.role === 'newbie'
                ? isZh
                  ? '请先阅读资料并上传 Word 学习报告，管理员审核通过后解锁见习权限。'
                  : 'Please study the knowledge base and upload your Word report to unlock trainee access.'
                : userProfile.role === 'trainee'
                ? isZh
                  ? '恭喜进入见习阶段，继续完成课程系统任务以申请交易员等级。'
                  : 'You are in trainee mode. Complete the course tasks to apply for trader levels.'
                : isZh
                ? '拥有完整访问权限，可直接进入量化天网与各系统。'
                : 'Full access granted. Explore Quant Net and all systems.'}
            </p>
          </div>
        )}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {accessibleTabs
              .filter((tab) => tab.visible)
              .map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
          </TabsList>

          <TabsContent value="materials" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {materialBlocks.map((block) => (
                <div
                  key={block.titleZh}
                  className="border border-white/10 bg-black/70 p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.4)] relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${block.accent} opacity-70`} />
                  <div className="relative space-y-3">
                    <h3 className="text-xl font-bold">
                      {isZh ? block.titleZh : block.titleEn}
                    </h3>
                    <p className="text-sm text-white/70">
                      {isZh ? block.descZh : block.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {userProfile?.role === 'newbie' && (
              <section className="border-2 border-dashed border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-6 space-y-4">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <UploadCloud className="w-5 h-5" />
                  {isZh ? '提交学习资料' : 'Submit Study Report'}
                </h3>
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {isZh
                    ? '请上传 Word/PDF 文档，记录你的学习过程与心得，管理员审核通过后将自动解锁见习权限。'
                    : 'Upload your study report (Word/PDF). Once approved you will unlock trainee access.'}
                </p>

                <div
                  className="border-2 border-dashed border-blue-300 bg-white dark:bg-transparent p-6 text-center cursor-pointer"
                  onClick={() => document.getElementById('material-upload')?.click()}
                >
                  <input
                    id="material-upload"
                    type="file"
                    accept=".doc,.docx,.pdf"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      await handleMaterialUpload(file);
                      e.target.value = '';
                    }}
                  />
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    {uploading
                      ? isZh
                        ? '上传中...'
                        : 'Uploading...'
                      : isZh
                      ? '点击或拖拽文件到此处'
                      : 'Click or drag file here'}
                  </p>
                  {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
                </div>

                {materials.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">{isZh ? '历史提交' : 'Submission History'}</p>
                    <ul className="space-y-2">
                      {materials.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between border border-blue-100 dark:border-blue-800 bg-white dark:bg-blue-950/30 px-4 py-2 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span>{item.file_path.split('/').pop()}</span>
                          </div>
                          <span>
                            {item.status === 'pending'
                              ? isZh
                                ? '待审核'
                                : 'Pending'
                              : item.status === 'approved'
                              ? isZh
                                ? '已通过'
                                : 'Approved'
                              : isZh
                              ? '已驳回'
                              : 'Rejected'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </TabsContent>

          {canViewCourses && (
            <TabsContent value="courses" className="space-y-6">
              <div className="bg-black/70 border border-white/10 p-8 text-white space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
                {courseStages.map((stage) => (
                  <div
                    key={stage.stageZh}
                    className="border border-white/10 p-6 hover:border-[#1a3dff]/40 transition-colors"
                  >
                    <p className="text-sm tracking-[0.3em] text-white/60 uppercase">
                      {isZh ? stage.stageZh : stage.stageEn}
                    </p>
                    <p className="mt-3 text-lg font-semibold">
                      {isZh ? stage.descZh : stage.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {canReviewMaterials && (
            <TabsContent value="review" className="space-y-6">
              <MaterialReview supabase={supabase} />
            </TabsContent>
          )}

          {canViewQuant && (
            <TabsContent value="tianti" className="space-y-6">
              <TiantiPanel />
            </TabsContent>
          )}

          {/* 只有管理员身份才能访问身份管理内容 */}
          {isAdmin && userProfile?.role === 'admin' && (
            <TabsContent value="identity" className="space-y-6">
              <IdentityManagement supabase={supabase} />
            </TabsContent>
          )}
        </Tabs>
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-white">{t('dashboard.footer.warning')}</p>
          <p className="mt-1">{t('dashboard.footer.copyright')}</p>
        </div>
      </div>
    </div>
  );
}

interface FuliSystemLoginProps {
  isZh: boolean;
  onAuthenticate: (profile: UserProfile) => void;
  storageKey: string;
  supabase: SupabaseClient;
}

function FuliSystemLogin({ isZh, onAuthenticate, storageKey, supabase }: FuliSystemLoginProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('email, role, study_status')
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new Error(isZh ? '未能获取权限信息，请联系管理员。' : 'Unable to load profile.');
    }

    return {
      id: userId,
      email: data.email,
      role: data.role as UserRole,
      studyStatus: data.study_status as StudyStatus,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setStatus('error');
      setErrorMessage(error?.message || (isZh ? '登录失败，请检查邮箱或密码。' : 'Sign-in failed.'));
      return;
    }

    try {
      const profile = await fetchProfile(data.user.id);
      localStorage.setItem(storageKey, 'true');
      onAuthenticate(profile);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Profile load error');
    }
  };

  return (
    <>
      <div className="relative min-h-screen text-white flex items-center justify-center px-4 py-16 overflow-hidden login-bg">
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative w-full max-w-md border border-white/50 bg-[#050505]/95 p-12 shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
          <div className="text-center space-y-3 mb-10">
            <p className="text-sm tracking-[0.45em] text-white/75">
              {isZh ? '会员系统登录' : 'Member System Login'}
            </p>
            <h1 className="text-3xl md:text-4xl font-black">{isZh ? '会员登录' : 'Member Login'}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">
                {isZh ? '邮箱' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZh ? '请输入邮箱' : 'Enter email'}
                className="w-full border border-[#272727] bg-black/80 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1a3dff] focus:ring-2 focus:ring-[#1a3dff]/30"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">
                {isZh ? '密码' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isZh ? '请输入密码' : 'Enter password'}
                className="w-full border border-[#272727] bg-black/80 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1a3dff] focus:ring-2 focus:ring-[#1a3dff]/30"
                required
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400 tracking-wide">{errorMessage}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:flex-1 flex items-center justify-center gap-3 border border-transparent bg-[#1a3dff] py-3 text-sm font-semibold tracking-[0.35em] text-white uppercase shadow-[0_15px_35px_rgba(26,61,255,0.35)] hover:bg-[#274bff] disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    {isZh ? '登录中...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {isZh ? '登录' : 'Access'}
                  </>
                )}
              </button>

              <a
                href="/"
                className="w-full sm:flex-1 inline-flex items-center justify-center text-sm font-semibold tracking-[0.25em] text-white/75 hover:text-white transition-colors border border-[#2a2a2a] py-3 uppercase"
              >
                {isZh ? '返回首页' : 'Back to home'}
              </a>
            </div>
          </form>
        </div>
      </div>
      <p className="mt-10 text-center text-xs tracking-[0.4em] text-white/60">
        {isZh ? '培训学员专用登录入口' : 'Dedicated access for trainees'}
      </p>
      <style jsx>{`
        .login-bg {
          background-image: url('/浮力系统.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
}

