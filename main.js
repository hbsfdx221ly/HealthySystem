// 健康管理平台主要JavaScript功能

// P5.js 背景动画
let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-background');
    
    // 初始化粒子
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: random(width),
            y: random(height),
            vx: random(-0.5, 0.5),
            vy: random(-0.5, 0.5),
            size: random(2, 4),
            alpha: random(0.1, 0.3)
        });
    }
}

function draw() {
    clear();
    
    // 绘制粒子
    for (let particle of particles) {
        fill(30, 144, 255, particle.alpha * 255);
        noStroke();
        ellipse(particle.x, particle.y, particle.size);
        
        // 更新粒子位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 边界检测
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
    }
    
    // 绘制连接线
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < 100) {
                stroke(30, 144, 255, (1 - d / 100) * 50);
                strokeWeight(1);
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    animateHealthScores();
    initializeDataInput();
});

// 初始化图表
function initializeCharts() {
    // 健康指标趋势图
    const healthTrendsChart = echarts.init(document.getElementById('health-trends-chart'));
    const healthTrendsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['血压', '血糖', '体重', '心率']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '血压',
                type: 'line',
                data: [120, 118, 122, 119, 121, 117, 120],
                smooth: true,
                itemStyle: { color: '#3b82f6' }
            },
            {
                name: '血糖',
                type: 'line',
                data: [5.8, 5.6, 5.9, 5.7, 6.0, 5.8, 5.7],
                smooth: true,
                itemStyle: { color: '#10b981' }
            },
            {
                name: '体重',
                type: 'line',
                data: [70.5, 70.2, 69.8, 69.5, 69.3, 69.0, 68.8],
                smooth: true,
                itemStyle: { color: '#f59e0b' }
            },
            {
                name: '心率',
                type: 'line',
                data: [72, 74, 71, 73, 70, 72, 71],
                smooth: true,
                itemStyle: { color: '#ef4444' }
            }
        ]
    };
    healthTrendsChart.setOption(healthTrendsOption);

    // 风险评估分布图
    const riskAssessmentChart = echarts.init(document.getElementById('risk-assessment-chart'));
    const riskAssessmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['低风险', '中风险', '高风险']
        },
        series: [
            {
                name: '风险分布',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 65, name: '低风险', itemStyle: { color: '#10b981' } },
                    { value: 25, name: '中风险', itemStyle: { color: '#f59e0b' } },
                    { value: 10, name: '高风险', itemStyle: { color: '#ef4444' } }
                ]
            }
        ]
    };
    riskAssessmentChart.setOption(riskAssessmentOption);

    // 响应式处理
    window.addEventListener('resize', function() {
        healthTrendsChart.resize();
        riskAssessmentChart.resize();
    });
}

// 健康评分动画
function animateHealthScores() {
    // 数字计数动画
    anime({
        targets: '#health-score',
        innerHTML: [0, 85],
        easing: 'easeOutExpo',
        duration: 2000,
        round: 1
    });

    // 卡片依次出现动画
    anime({
        targets: '.health-metric',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutExpo'
    });

    // 图表容器动画
    anime({
        targets: '.card-hover',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 500}),
        duration: 600,
        easing: 'easeOutExpo'
    });
}

// 数据输入模态框
function openDataInput() {
    document.getElementById('data-input-modal').classList.remove('hidden');
    anime({
        targets: '#data-input-modal .bg-white',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });
}

function closeDataInput() {
    anime({
        targets: '#data-input-modal .bg-white',
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInExpo',
        complete: function() {
            document.getElementById('data-input-modal').classList.add('hidden');
        }
    });
}

// 初始化数据输入表单
function initializeDataInput() {
    const form = document.getElementById('health-data-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // 模拟数据保存
            setTimeout(() => {
                // 显示成功消息
                showNotification('健康数据已保存成功！', 'success');
                closeDataInput();
                
                // 更新健康评分（模拟）
                updateHealthMetrics();
            }, 500);
        });
    }
}

// 更新健康指标
function updateHealthMetrics() {
    // 模拟数据更新动画
    anime({
        targets: '#health-score',
        innerHTML: [85, 87],
        easing: 'easeOutExpo',
        duration: 1000,
        round: 1
    });

    // 更新图表数据
    setTimeout(() => {
        showNotification('健康指标已更新！', 'success');
    }, 1000);
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 动画显示
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });
    
    // 自动消失
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInExpo',
            complete: function() {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// 疾病预测页面功能
function initializePrediction() {
    const steps = document.querySelectorAll('.prediction-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== stepIndex);
        });
        
        // 更新进度条
        const progress = ((stepIndex + 1) / steps.length) * 100;
        anime({
            targets: '.progress-bar',
            width: progress + '%',
            duration: 300,
            easing: 'easeOutExpo'
        });
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // 问卷提交处理
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateRisk();
        });
    }
}

// 计算风险评分
function calculateRisk() {
    const formData = new FormData(document.getElementById('prediction-form'));
    const data = Object.fromEntries(formData);
    
    // 模拟风险计算
    let riskScore = Math.random() * 100;
    
    // 显示加载动画
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showRiskResult(riskScore);
    }, 2000);
}

// 显示风险结果
function showRiskResult(score) {
    const resultContainer = document.getElementById('risk-result');
    const riskLevel = score < 30 ? 'low' : score < 70 ? 'medium' : 'high';
    const riskText = score < 30 ? '低风险' : score < 70 ? '中风险' : '高风险';
    const riskColor = score < 30 ? '#10b981' : score < 70 ? '#f59e0b' : '#ef4444';
    
    resultContainer.innerHTML = `
        <div class="text-center">
            <div class="text-6xl mb-4">${score < 30 ? '😊' : score < 70 ? '😐' : '😟'}</div>
            <h3 class="text-2xl font-bold mb-2" style="color: ${riskColor}">${riskText}</h3>
            <p class="text-gray-600 mb-4">您的风险评分: ${score.toFixed(1)}%</p>
            <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium mb-2">建议措施:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${score < 30 ? 
                        '<li>• 保持良好的生活习惯</li><li>• 定期体检</li><li>• 适量运动</li>' :
                        score < 70 ?
                        '<li>• 改善饮食结构</li><li>• 增加运动量</li><li>• 定期监测相关指标</li>' :
                        '<li>• 立即咨询医生</li><li>• 制定治疗计划</li><li>• 密切监控健康状况</li>'
                    }
                </ul>
            </div>
        </div>
    `;
    
    // 显示结果动画
    anime({
        targets: '#risk-result',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 600,
        easing: 'easeOutExpo'
    });
}

// 加载动画
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-6 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">正在分析您的健康数据...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        document.body.removeChild(loading);
    }
}

// 健康管理页面功能
function initializeManagement() {
    // 目标设置功能
    const goalButtons = document.querySelectorAll('.goal-btn');
    goalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const goalType = this.dataset.goal;
            setHealthGoal(goalType);
        });
    });

    // 建议卡片动画
    anime({
        targets: '.suggestion-card',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutExpo'
    });

    // 进度条动画
    initializeProgressBars();
}

// 设置健康目标
function setHealthGoal(type) {
    const goals = {
        weight: { title: '减重目标', target: '减重5kg', period: '3个月' },
        blood: { title: '血压控制', target: '血压<130/85', period: '2个月' },
        sleep: { title: '睡眠改善', target: '睡眠8小时', period: '1个月' },
        exercise: { title: '运动计划', target: '每周5次', period: '持续进行' }
    };
    
    const goal = goals[type];
    showNotification(`已设置${goal.title}: ${goal.target}`, 'success');
    
    // 更新UI显示
    updateGoalDisplay(type, goal);
}

// 更新目标显示
function updateGoalDisplay(type, goal) {
    const goalContainer = document.getElementById('current-goals');
    if (goalContainer) {
        const goalElement = document.createElement('div');
        goalElement.className = 'bg-blue-50 border border-blue-200 rounded-lg p-4';
        goalElement.innerHTML = `
            <h4 class="font-medium text-blue-900">${goal.title}</h4>
            <p class="text-sm text-blue-700 mt-1">目标: ${goal.target}</p>
            <p class="text-xs text-blue-600 mt-1">周期: ${goal.period}</p>
            <div class="mt-2">
                <div class="w-full bg-blue-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
                </div>
            </div>
        `;
        goalContainer.appendChild(goalElement);
        
        // 动画显示新目标
        anime({
            targets: goalElement,
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 500,
            easing: 'easeOutExpo'
        });
    }
}

// 初始化进度条
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const progress = [75, 60, 85, 90][index] || 70;
        anime({
            targets: bar,
            width: progress + '%',
            duration: 1500,
            delay: index * 200,
            easing: 'easeOutExpo'
        });
    });
}

// 数据分析页面功能
function initializeAnalytics() {
    // 初始化高级图表
    initializeAdvancedCharts();
    
    // 数据筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            applyDataFilter(filterType);
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 报告生成功能
    const generateReportBtn = document.getElementById('generate-report');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateHealthReport);
    }
}

// 初始化高级图表
function initializeAdvancedCharts() {
    // 健康雷达图
    const radarChart = echarts.init(document.getElementById('health-radar-chart'));
    const radarOption = {
        title: {
            text: '健康指标雷达图'
        },
        radar: {
            indicator: [
                { name: '心血管', max: 100 },
                { name: '代谢', max: 100 },
                { name: '免疫', max: 100 },
                { name: '精神', max: 100 },
                { name: '运动', max: 100 },
                { name: '营养', max: 100 }
            ]
        },
        series: [{
            name: '健康指标',
            type: 'radar',
            data: [{
                value: [85, 78, 92, 88, 75, 82],
                name: '当前状态'
            }]
        }]
    };
    radarChart.setOption(radarOption);

    // 健康热力图
    const heatmapChart = echarts.init(document.getElementById('health-heatmap-chart'));
    const heatmapData = generateHeatmapData();
    const heatmapOption = {
        title: {
            text: '健康数据热力图'
        },
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: '凌晨 早晨 上午 中午 下午 晚上 深夜'.split(' '),
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        series: [{
            name: '健康指数',
            type: 'heatmap',
            data: heatmapData,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    heatmapChart.setOption(heatmapOption);
}

// 生成热力图数据
function generateHeatmapData() {
    const data = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            data.push([i, j, Math.floor(Math.random() * 100)]);
        }
    }
    return data;
}

// 应用数据筛选
function applyDataFilter(filterType) {
    // 模拟数据筛选逻辑
    showNotification(`已应用${filterType}筛选`, 'info');
    
    // 更新图表数据（这里可以添加实际的数据更新逻辑）
    setTimeout(() => {
        initializeAdvancedCharts();
    }, 500);
}

// 生成健康报告
function generateHealthReport() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('健康报告生成完成！', 'success');
        
        // 模拟报告下载
        const reportData = {
            period: '2024年1月-3月',
            overallScore: 85,
            improvements: ['运动量增加', '睡眠质量改善'],
            concerns: ['血糖控制', '压力管理'],
            recommendations: ['增加有氧运动', '定期监测血糖']
        };
        
        console.log('健康报告数据:', reportData);
    }, 2000);
}

// 页面路由处理
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'prediction.html':
            initializePrediction();
            break;
        case 'management.html':
            initializeManagement();
            break;
        case 'analytics.html':
            initializeAnalytics();
            break;
        default:
            // 主页已经在DOMContentLoaded中初始化
            break;
    }
}

// 初始化页面
initializePage();