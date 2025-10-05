require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // 允许跨域请求，方便开发

// ⚠️ 重要：请将您的 API 密钥存储在环境变量中，不要硬编码在代码里！
// 我在这里使用一个占位符。
// 这个密钥格式看起来像智谱AI的，所以我将使用其 v4 API 地址。
// 如果您的提供商不同，请修改 API_URL 和模型名称。
const ZHIPU_AI_TOKEN = process.env.API_KEY; 
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const history = req.body.history || [];

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // 构建发送给大模型的历史消息
    const messages = [
        {
            role: 'system',
            content: `你是一个专业的AI健康风险评估助手。你的任务是：

1. 基于用户提供的健康数据，计算综合健康风险评分（0-100分）
2. 提供详细的风险等级评估（低度风险/中等风险/高度风险）
3. 给出个性化的健康建议和改善方案
4. 强调这仅供参考，不能替代专业医疗诊断

请按以下格式回复：
- 首先给出具体的风险评分数字
- 然后说明风险等级
- 接着提供结果解读
- 最后给出个性化的健康建议
- 在回复末尾添加免责声明

注意：评分标准：
- 0-40分：低度风险
- 41-70分：中等风险  
- 71-100分：高度风险

免责声明：以上问卷仅用于健康筛查，不能替代医生面诊与实验室检查；如有阳性条目或症状，请及时就医。

请基于用户的具体数据进行分析，提供专业、实用的建议。`
        },
        ...history,
        {
            role: 'user',
            content: userMessage
        }
    ];

    try {
        const response = await axios.post(API_URL, {
            model: 'glm-4', // 或者 'glm-3-turbo'
            messages: messages,
            stream: false, // 为了简单起见，我们先使用非流式响应
        }, {
            headers: {
                'Authorization': `Bearer ${ZHIPU_AI_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].message.content;
        res.json({ reply: aiResponse });

    } catch (error) {
        console.error('Error calling AI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: '调用AI服务时出错，请稍后再试。' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI aPI代理服务器正在 http://localhost:${PORT} 运行`);
});
