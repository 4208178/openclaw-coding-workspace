# TOOLS.md - CTO 工具与资源

## 代码审查工具

### 静态代码分析
- **ESLint**：JavaScript/TypeScript 代码检查
- **Prettier**：代码格式化
- **Black**：Python 代码格式化
- **Flake8**：Python 代码检查
- **SonarQube**：代码质量分析平台

### 代码覆盖率
- **Jest**：JavaScript/TypeScript 测试框架
- **Pytest**：Python 测试框架
- **Coverage.py**：Python 代码覆盖率工具
- **Istanbul**：JavaScript 代码覆盖率工具

### 代码审查流程
- **GitHub Pull Request**：代码审查流程
- **GitLab Merge Request**：代码审查流程
- **Bitbucket Pull Request**：代码审查流程

---

## 技术选型工具

### 技术调研
- **GitHub Trending**：技术趋势
- **Stack Overflow**：技术问答
- **Hacker News**：技术新闻
- **Reddit r/programming**：技术讨论

### 技术评估
- **TechEmpower Benchmarks**：性能基准测试
- **The Computer Language Benchmarks Game**：语言性能对比
- **DB-Engines**：数据库流行度排名
- **Framework Benchmarks**：框架性能对比

### 技术文档
- **官方文档**：技术官方文档
- **API 文档**：API 参考文档
- **最佳实践**：技术最佳实践
- **设计模式**：软件设计模式

---

## 架构设计工具

### 架构图
- **Mermaid**：图表绘制工具
- **PlantUML**：UML 图表工具
- **Draw.io**：在线图表工具
- **Lucidchart**：在线图表工具

### 架构模式
- **微服务架构**：微服务设计模式
- **事件驱动架构**：事件驱动设计模式
- **领域驱动设计**：DDD 设计模式
- **Clean Architecture**：整洁架构

### 架构评估
- **AWS Well-Architected Framework**：AWS 架构最佳实践
- **Azure Architecture Center**：Azure 架构最佳实践
- **Google Cloud Architecture**：Google Cloud 架构最佳实践

---

## DevOps 工具

### CI/CD
- **GitHub Actions**：GitHub CI/CD
- **GitLab CI/CD**：GitLab CI/CD
- **Jenkins**：开源 CI/CD 工具
- **CircleCI**：云 CI/CD 平台

### 容器化
- **Docker**：容器化平台
- **Kubernetes**：容器编排平台
- **Docker Compose**：多容器应用编排
- **Helm**：Kubernetes 包管理器

### 基础设施即代码
- **Terraform**：基础设施即代码工具
- **Ansible**：自动化配置管理
- **Puppet**：自动化配置管理
- **Chef**：自动化配置管理

---

## 监控与日志

### 监控
- **Prometheus**：监控和告警系统
- **Grafana**：监控可视化平台
- **Datadog**：云监控平台
- **New Relic**：应用性能监控

### 日志
- **ELK Stack**：日志分析平台
- **Splunk**：日志分析平台
- **Logstash**：日志收集工具
- **Fluentd**：日志收集工具

---

## 安全工具

### 安全扫描
- **Snyk**：依赖安全扫描
- **OWASP ZAP**：Web 应用安全扫描
- **SonarQube**：代码安全分析
- **Trivy**：容器安全扫描

### 安全测试
- **Burp Suite**：Web 安全测试工具
- **OWASP Dependency-Check**：依赖安全检查
- **Bandit**：Python 安全检查
- **Safety**：Python 依赖安全检查

---

## 性能优化工具

### 性能分析
- **Chrome DevTools**：浏览器性能分析
- **Lighthouse**：Web 性能分析
- **WebPageTest**：Web 性能测试
- **GTmetrix**：Web 性能分析

### 性能监控
- **New Relic**：应用性能监控
- **AppDynamics**：应用性能监控
- **Dynatrace**：应用性能监控
- **Pingdom**：网站性能监控

---

## 技术债务管理

### 技术债务跟踪
- **SonarQube**：代码质量和技术债务跟踪
- **CodeClimate**：代码质量分析
- **Scrutinizer**：代码质量分析
- **Better Code Hub**：代码质量评估

### 技术债务偿还
- **重构**：代码重构
- **重写**：代码重写
- **优化**：代码优化
- **文档化**：代码文档化

---

## 团队协作工具

### 项目管理
- **Jira**：项目管理工具
- **Trello**：项目管理工具
- **Asana**：项目管理工具
- **Monday.com**：项目管理工具

### 文档协作
- **Confluence**：文档协作平台
- **Notion**：文档协作平台
- **Google Docs**：文档协作平台
- **Microsoft Teams**：团队协作平台

### 代码协作
- **GitHub**：代码托管平台
- **GitLab**：代码托管平台
- **Bitbucket**：代码托管平台
- **Gitea**：自托管代码托管平台

---

## 学习资源

### 技术博客
- **High Scalability**：高可扩展性系统设计
- **The Pragmatic Engineer**：软件工程实践
- **Engineering at Meta**：Meta 工程实践
- **Netflix TechBlog**：Netflix 技术博客

### 技术书籍
- **《Clean Code》**：代码整洁之道
- **《Design Patterns》**：设计模式
- **《The Pragmatic Programmer》**：程序员修炼之道
- **《Refactoring》**：重构

### 技术课程
- **Coursera**：在线课程平台
- **edX**：在线课程平台
- **Udacity**：在线课程平台
- **Pluralsight**：在线课程平台

---

## 常用命令

### Git 常用命令
```bash
git clone <repository>          # 克隆仓库
git pull                        # 拉取最新代码
git push                        # 推送代码
git branch <branch-name>        # 创建分支
git checkout <branch-name>     # 切换分支
git merge <branch-name>        # 合并分支
git status                      # 查看状态
git log                         # 查看日志
```

### Docker 常用命令
```bash
docker build -t <image-name> .  # 构建镜像
docker run <image-name>         # 运行容器
docker ps                       # 查看运行中的容器
docker stop <container-id>      # 停止容器
docker rm <container-id>        # 删除容器
docker images                   # 查看镜像
docker rmi <image-id>           # 删除镜像
```

### Kubernetes 常用命令
```bash
kubectl get pods                # 查看 Pod
kubectl get services           # 查看 Service
kubectl apply -f <file.yaml>    # 应用配置
kubectl delete -f <file.yaml>   # 删除资源
kubectl logs <pod-name>         # 查看 Pod 日志
kubectl exec -it <pod-name> -- bash  # 进入 Pod
```

---

## 环境配置

### 开发环境
- **Node.js**：JavaScript 运行时
- **Python**：Python 解释器
- **Java**：Java 开发工具包
- **Go**：Go 编程语言

### 编辑器
- **VS Code**：代码编辑器
- **IntelliJ IDEA**：Java IDE
- **PyCharm**：Python IDE
- **WebStorm**：Web 开发 IDE

### 终端
- **iTerm2**：macOS 终端
- **Windows Terminal**：Windows 终端
- **Hyper**：跨平台终端
- **Alacritty**：跨平台终端

---

## 快捷键

### VS Code 快捷键
- `Cmd/Ctrl + P`：快速打开文件
- `Cmd/Ctrl + Shift + P`：命令面板
- `Cmd/Ctrl + /`：注释/取消注释
- `Cmd/Ctrl + D`：选择下一个相同的词
- `Cmd/Ctrl + Shift + D`：选择所有相同的词

### Git 快捷键
- `git status`：查看状态
- `git diff`：查看差异
- `git add .`：添加所有更改
- `git commit -m "message"`：提交更改
- `git push`：推送更改

---

## 常见问题

### 代码审查常见问题
- **代码风格不一致**：使用代码格式化工具统一风格
- **缺少测试**：要求添加测试用例
- **性能问题**：使用性能分析工具定位问题
- **安全问题**：使用安全扫描工具检查漏洞

### 技术选型常见问题
- **技术不成熟**：选择成熟稳定的技术
- **学习成本高**：考虑团队技术栈和学习成本
- **社区支持不足**：选择有活跃社区的技术
- **维护成本高**：考虑长期维护成本

### 架构设计常见问题
- **过度设计**：避免过度设计，保持简单
- **耦合度高**：降低模块间耦合度
- **扩展性差**：设计可扩展的架构
- **性能瓶颈**：优化关键路径性能

---

## 相关

- [CTO 职责](IDENTITY.md)
- [CTO 人格](SOUL.md)
- [CTO 工作手册](AGENTS.md)
