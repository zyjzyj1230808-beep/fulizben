"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrandName from '@/components/custom/BrandName';
import { useLanguage } from '@/contexts/LanguageContext';
import TiantiPanel from '@/app/[locale]/(portal)/dashboard/components/TiantiPanel';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { CheckCircle, RefreshCw } from 'lucide-react';
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

interface QuizQuestion {
  id: string;
  questionZh: string;
  questionEn: string;
  options: { zh: string; en: string }[];
  answerIndex: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionZh: '新人从“新学员”晋级为“见习学员”的必要条件是什么？',
    questionEn: 'What is required for a newbie to become a trainee?',
    options: [
      { zh: '提交 Word 报告等待人工审核', en: 'Upload a Word report for manual review' },
      { zh: '完成选择题考试并获得 100 分', en: 'Pass the multiple-choice exam with a perfect score' },
      { zh: '主动联系管理员申请放行', en: 'Ask an admin to unlock manually' },
      { zh: '缴纳报名费用', en: 'Pay an enrollment fee' },
    ],
    answerIndex: 1,
  },
  {
    id: 'q2',
    questionZh: '考试未满分时，以下哪项描述正确？',
    questionEn: 'If the exam is not a perfect score, which is correct?',
    options: [
      { zh: '只能再考一次', en: 'Only one more attempt is allowed' },
      { zh: '需要等待管理员批准后再考', en: 'Must wait for admin approval to retry' },
      { zh: '可以无限次重考，直到 100 分', en: 'Can retake unlimited times until 100' },
      { zh: '系统自动晋级为见习学员', en: 'System still promotes to trainee' },
    ],
    answerIndex: 2,
  },
  {
    id: 'q3',
    questionZh: '通过考试后系统会自动做什么？',
    questionEn: 'What happens after passing the exam?',
    options: [
      { zh: '自动升级角色为见习学员', en: 'Auto-upgrade role to trainee' },
      { zh: '发送邮件让你手动申请', en: 'Send an email to apply manually' },
      { zh: '要求再次提交学习资料', en: 'Ask to upload study materials again' },
      { zh: '无任何变化，需要管理员操作', en: 'Nothing changes until admin acts' },
    ],
    answerIndex: 0,
  },
  {
    id: 'q4',
    questionZh: '以下哪项行为符合学习纪律？',
    questionEn: 'Which behavior matches the discipline?',
    options: [
      { zh: '遇到不懂的题目直接猜测提交', en: 'Guess and submit without understanding' },
      { zh: '确保每题理解后再答，力求零错误', en: 'Understand each question and aim for zero mistakes' },
      { zh: '随便选择答案，后续让管理员帮改', en: 'Pick random answers and ask admins to fix later' },
      { zh: '考试期间与他人共享账号', en: 'Share account during the exam' },
    ],
    answerIndex: 1,
  },
  {
    id: 'q5',
    questionZh: '如果已经是见习学员或更高角色，再次考试会怎样？',
    questionEn: 'If you are already a trainee or higher, what happens when retaking?',
    options: [
      { zh: '角色被降级为新学员', en: 'Role is downgraded to newbie' },
      { zh: '保持当前角色，记录通过日志', en: 'Role stays; pass is logged' },
      { zh: '必须联系管理员解锁', en: 'Must contact admin to unlock' },
      { zh: '账号被锁定', en: 'Account gets locked' },
    ],
    answerIndex: 1,
  },
  {
    id: 'q6',
    questionZh: '考试需要达到的分数线是？',
    questionEn: 'What score is required to pass?',
    options: [
      { zh: '60 分', en: '60 points' },
      { zh: '80 分', en: '80 points' },
      { zh: '90 分', en: '90 points' },
      { zh: '100 分', en: '100 points' },
    ],
    answerIndex: 3,
  },
];

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
    }
    setLoadingProfile(false);
  };

  const handleExamPassed = () => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role: 'trainee', studyStatus: 'approved' as StudyStatus };
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setActiveTab('courses');
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
        value: 'tianti',
        label: isZh ? '量化天网' : 'Quant Net',
        visible: !!canViewQuant,
      },
    ],
    [isZh, canViewCourses, canViewQuant]
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
                  : 'Please study the knowledge base first, then complete the multiple-choice exam (perfect score required) to auto-unlock trainee access.'
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
              <ExamSection isZh={isZh} supabase={supabase} onPassed={handleExamPassed} />
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


function ExamSection({
  isZh,
  supabase,
  onPassed,
}: {
  isZh: boolean;
  supabase: SupabaseClient;
  onPassed: () => void;
}) {
  const initialAnswers = useMemo(
    () =>
      QUIZ_QUESTIONS.reduce((acc, q) => {
        acc[q.id] = null;
        return acc;
      }, {} as Record<string, number | null>),
    []
  );
  const [answers, setAnswers] = useState<Record<string, number | null>>({ ...initialAnswers });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [scoreInfo, setScoreInfo] = useState<{ score: number; total: number } | null>(null);
  const [ready, setReady] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setAnswers({ ...initialAnswers });
    setScoreInfo(null);
    setError('');
  };

  const handleSubmit = async () => {
    const total = QUIZ_QUESTIONS.length;
    const score = QUIZ_QUESTIONS.reduce(
      (sum, q) => sum + (answers[q.id] === q.answerIndex ? 1 : 0),
      0
    );
    setScoreInfo({ score, total });
    setError('');

    if (score !== total) return;

    setSubmitting(true);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error(isZh ? '??????????' : 'Please sign in again before submitting.');

      const response = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score, total }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || (isZh ? '??????????' : 'Failed to submit, please retry.'));
      }

      onPassed();
    } catch (err) {
      setError(err instanceof Error ? err.message : isZh ? '????' : 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-2 border-dashed border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-6 space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {isZh ? '???????????' : 'Online Exam: Perfect Score to Unlock'}
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-100">
            {isZh
              ? '???????????????????? 100 ????????????????????????'
              : 'Study the materials first, then take the quiz; 100/100 required, unlimited retries, perfect score auto-promotes to trainee.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {isZh ? '????' : 'Reset answers'}
        </button>
      </div>

      {!ready ? (
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-blue-950/30 p-4 space-y-3">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            {isZh
              ? '?????????????????????????????????'
              : 'Please finish the study materials before starting. Confirm readiness to unlock the exam.'}
          </p>
          <button
            type="button"
            onClick={() => setReady(true)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
          >
            {isZh ? '??????????' : 'I have studied, start exam'}
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="border border-blue-100 dark:border-blue-900 rounded-lg bg-white dark:bg-blue-950/30 p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <div className="space-y-3 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {isZh ? q.questionZh : q.questionEn}
                    </p>
                    <div className="grid gap-2">
                      {q.options.map((opt, optIdx) => {
                        const selected = answers[q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelect(q.id, optIdx)}
                            className={`text-left w-full border rounded-md px-3 py-2 text-sm transition-colors ${
                              selected
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100'
                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <span className="font-medium">
                              {optIdx + 1}. {isZh ? opt.zh : opt.en}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {scoreInfo && (
            <div
              className={`rounded-lg border px-4 py-3 ${
                scoreInfo.score === scoreInfo.total
                  ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20 text-green-800 dark:text-green-100'
                  : 'border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20 text-orange-800 dark:text-orange-100'
              }`}
            >
              <p className="font-semibold">
                {isZh ? '????' : 'Current score'}?{scoreInfo.score} / {scoreInfo.total}
              </p>
              <p className="text-sm mt-1">
                {scoreInfo.score === scoreInfo.total
                  ? isZh
                    ? '??????????????????'
                    : 'Perfect! You will be promoted to trainee automatically.'
                  : isZh
                  ? '?? 100 ???????????????????'
                  : 'Perfect score required. Update answers and submit again.'}
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 px-4 py-3 text-red-700 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-blue-900 dark:text-blue-100">
              {isZh
                ? '?????????????????????????'
                : 'Note: all answers must be correct. Unlimited retries.'}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 disabled:opacity-60 transition-colors"
              >
                {submitting ? (isZh ? '???...' : 'Submitting...') : isZh ? '?????' : 'Submit to unlock'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isZh ? '????' : 'Clear answers'}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
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

