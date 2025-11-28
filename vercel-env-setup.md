# Vercel 环境变量设置指南

## 方法一：通过网页界面

### 步骤 1：登录并选择项目
1. 访问 https://vercel.com
2. 登录你的账户
3. 在 Dashboard 中找到项目 `fulizben`（或你的项目名称）
4. **点击项目名称**进入项目详情页

### 步骤 2：进入设置页面
在项目详情页的**顶部导航栏**，你会看到以下标签：
- Overview（概览）
- Deployments（部署）
- Analytics（分析）
- **Settings（设置）** ← 点击这个

### 步骤 3：找到环境变量选项
进入 Settings 页面后，在**左侧菜单栏**中查找：
- General（常规）
- **Environment Variables（环境变量）** ← 点击这个
- Git
- Domains（域名）
- Integrations（集成）
- 等等...

### 步骤 4：添加环境变量
点击 "Environment Variables" 后，你会看到：
- 一个表格显示现有的环境变量（如果有）
- 右上角或顶部有一个 **"Add New"** 或 **"Add"** 按钮

点击 "Add New" 后，会弹出表单：
- **Name（名称）**：输入变量名
- **Value（值）**：输入变量值
- **Environment（环境）**：选择 Production、Preview、Development（建议全选）

### 需要添加的三个变量：

#### 变量 1
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://beifxcgwgfcadokarsxj.supabase.co
Environment: ✅ Production ✅ Preview ✅ Development
```

#### 变量 2
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaWZ4Y2d3Z2ZjYWRva2Fyc3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjg2OTYsImV4cCI6MjA3OTgwNDY5Nn0.388pX6PU4VZVMgaQuVlbPWv7J3hoCEll7fob8_9yOr4
Environment: ✅ Production ✅ Preview ✅ Development
```

#### 变量 3
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaWZ4Y2d3Z2ZjYWRva2Fyc3hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDIyODY5NiwiZXhwIjoyMDc5ODA0Njk2fQ.eVVmCBS409vdY6ninYSuAX_rvVBSt4n2a14Y2ylw8q4
Environment: ✅ Production ✅ Preview ✅ Development
```

### 步骤 5：重新部署
添加完所有环境变量后：
1. 返回 "Deployments" 页面
2. 找到最新的部署记录
3. 点击右侧的 **"..."** 菜单
4. 选择 **"Redeploy"**（重新部署）

---

## 方法二：使用 Vercel CLI（如果网页界面找不到）

### 安装 Vercel CLI
```bash
npm i -g vercel
```

### 登录 Vercel
```bash
vercel login
```

### 在项目目录中设置环境变量
```bash
# 设置 Supabase URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

# 设置 Supabase Anon Key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# 设置 Service Role Key
vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development
```

执行每个命令时，CLI 会提示你输入对应的值。

### 重新部署
```bash
vercel --prod
```

---

## 如果还是找不到

请告诉我：
1. 你在 Vercel Dashboard 的哪个页面？
2. 项目详情页的顶部导航栏有哪些选项？
3. 是否有看到 "Settings" 这个选项？

我可以根据你的具体情况提供更精确的指导。

