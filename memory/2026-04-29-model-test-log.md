# 模型可用性测试日志

## 测试时间
2026-04-29 13:52 GMT+8

## 测试目标
1. 基础对话能力
2. 工具调用（Tool Use）能力
3. 长上下文（>32k）能力
4. 代码生成能力

## 模型列表

### 当前配置（workspace-coding）
1. **custom-nvidia-glm4/z-ai/glm4.7** - GLM-4.7 (NVIDIA)
   - Context Window: 131072
   - Max Tokens: 16384
   - Supports Streaming: true
   - Supports Reasoning: true

### 全局配置（agents/coding/agent）
1. **nvidia/nemotron-3-super-120b-a12b** - NVIDIA Nemotron 3 Super 120B
   - Context Window: 262144
   - Max Tokens: 8192
   - Reasoning: false

2. **moonshotai/kimi-k2.5** - Kimi K2.5
   - Context Window: 262144
   - Max Tokens: 8192
   - Reasoning: false

3. **minimaxai/minimax-m2.5** - MiniMax M2.5
   - Context Window: 196608
   - Max Tokens: 8192
   - Reasoning: false

4. **z-ai/glm5** - GLM-5
   - Context Window: 202752
   - Max Tokens: 8192
   - Reasoning: false

5. **qwen/qwen3.5-122b-a10b** - Qwen 3.5 122B
   - Context Window: 262144
   - Max Tokens: 16384
   - Reasoning: false

6. **z-ai/glm4.7** - GLM-4.7
   - Context Window: 131072
   - Max Tokens: 16384
   - Reasoning: true

## 测试结果

### 测试 1: 基础对话能力
- [x] custom-nvidia-glm4/z-ai/glm4.7 - ✅ 成功 (1m25s, 14.8k tokens)
- [x] nvidia/nemotron-3-super-120b-a12b - ✅ 成功 (14s, 14.8k tokens)
- [ ] moonshotai/kimi-k2.5
- [ ] minimaxai/minimax-m2.5
- [ ] z-ai/glm5
- [x] qwen/qwen3.5-122b-a10b - ✅ 成功 (47s, 14.8k tokens)
- [ ] z-ai/glm4.7

### 测试 2: 工具调用（Tool Use）能力
- [ ] custom-nvidia-glm4/z-ai/glm4.7
- [ ] nvidia/nemotron-3-super-120b-a12b
- [ ] moonshotai/kimi-k2.5
- [ ] minimaxai/minimax-m2.5
- [ ] z-ai/glm5
- [ ] qwen/qwen3.5-122b-a10b
- [ ] z-ai/glm4.7

### 测试 3: 长上下文（>32k）能力
- [ ] custom-nvidia-glm4/z-ai/glm4.7
- [ ] nvidia/nemotron-3-super-120b-a12b
- [ ] moonshotai/kimi-k2.5
- [ ] minimaxai/minimax-m2.5
- [ ] z-ai/glm5
- [ ] qwen/qwen3.5-122b-a10b
- [ ] z-ai/glm4.7

### 测试 4: 代码生成能力
- [ ] custom-nvidia-glm4/z-ai/glm4.7
- [ ] nvidia/nemotron-3-super-120b-a12b
- [ ] moonshotai/kimi-k2.5
- [ ] minimaxai/minimax-m2.5
- [ ] z-ai/glm5
- [ ] qwen/qwen3.5-122b-a10b
- [ ] z-ai/glm4.7

## 测试详情

### custom-nvidia-glm4/z-ai/glm4.7
**基础对话：** ✅ 成功 (1m25s, 14.8k tokens)
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### nvidia/nemotron-3-super-120b-a12b
**基础对话：** ✅ 成功 (14s, 14.8k tokens)
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### moonshotai/kimi-k2.5
**基础对话：** 待测试
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### minimaxai/minimax-m2.5
**基础对话：** 待测试
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### z-ai/glm5
**基础对话：** 待测试
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### qwen/qwen3.5-122b-a10b
**基础对话：** ✅ 成功 (47s, 14.8k tokens)
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试

### z-ai/glm4.7
**基础对话：** 待测试
**工具调用：** 待测试
**长上下文：** 待测试
**代码生成：** 待测试
