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

// --- NEW: Multi-step form logic for prediction.html ---
let currentStep = 1;
let selectedPredictionType = null;

function selectPredictionType(type) {
    selectedPredictionType = type;
    
    // Store the type in the hidden input
    document.getElementById('prediction-type').value = type;

    // Hide selection cards, show form
    const selectionSection = document.getElementById('prediction-type-selection');
    const formSection = document.getElementById('prediction-form-section');
    
    anime({
        targets: selectionSection,
        opacity: 0,
        duration: 300,
        easing: 'easeInExpo',
        complete: () => {
            selectionSection.classList.add('hidden');
            formSection.classList.remove('hidden');
            anime({
                targets: formSection,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 400,
                easing: 'easeOutExpo'
            });
        }
    });

    // Show/hide form fields based on type
    const formGroups = document.querySelectorAll('#prediction-form .form-group');
    formGroups.forEach(group => {
        const types = group.dataset.predictionType.split(' ');
        const inputs = group.querySelectorAll('input, select');

        if (types.includes(type) || types.includes('all')) {
            group.classList.remove('hidden');
            inputs.forEach(input => input.setAttribute('required', 'required'));
        } else {
            group.classList.add('hidden');
            inputs.forEach(input => input.removeAttribute('required'));
        }
    });

    // Reset to step 1
    resetPredictionForm(false); // Reset without hiding the form
    formSection.scrollIntoView({ behavior: 'smooth' });
}


function validateStep(stepNumber) {
    const stepDiv = document.getElementById('step-' + stepNumber);
    const inputs = stepDiv.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.closest('.form-group.hidden')) {
            return; // Skip validation for hidden inputs
        }

        const errorP = input.nextElementSibling;
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        const value = parseFloat(input.value);

        let errorMessage = null;

        if (!input.value) {
            errorMessage = '此项为必填项。';
        } else if (!isNaN(min) && value < min) {
            errorMessage = `输入值不能小于 ${min}。`;
        } else if (!isNaN(max) && value > max) {
            errorMessage = `输入值不能大于 ${max}。`;
        }

        if (errorMessage) {
            isValid = false;
            input.classList.add('border-red-500');
            if (errorP && errorP.tagName === 'P') {
                errorP.textContent = errorMessage;
                errorP.classList.remove('hidden');
            }
        } else {
            input.classList.remove('border-red-500');
            if (errorP && errorP.tagName === 'P') {
                errorP.classList.add('hidden');
            }
        }
    });

    return isValid;
}


function nextStep(step) {
    if (!validateStep(currentStep)) {
        return; // Stop if validation fails
    }
    document.getElementById('step-' + currentStep).classList.remove('active');
    document.getElementById('step-' + step).classList.add('active');
    currentStep = step;
}

function prevStep(step) {
    document.getElementById('step-' + currentStep).classList.remove('active');
    document.getElementById('step-' + step).classList.add('active');
    currentStep = step;
}


// 疾病预测页面功能
function initializePrediction() {
    const form = document.getElementById('prediction-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateStep(currentStep)) {
                return; // Stop if final step validation fails
            }
            
            showLoading();
            
            // Simulate calculation delay
            setTimeout(() => {
                const { score, inputs } = calculateRisk();
                showRiskResult(score, inputs);
                hideLoading();
                
                const resultSection = document.getElementById('result-section');
                resultSection.classList.remove('hidden');
                
                // Animate result appearance
                anime({
                    targets: resultSection,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutExpo'
                });

                // Scroll to result
                resultSection.scrollIntoView({ behavior: 'smooth' });

                // --- NEW: Add event listener for the reset button ---
                const resetButton = document.getElementById('reset-prediction-btn');
                if(resetButton) {
                    resetButton.addEventListener('click', resetPredictionForm);
                }

            }, 1500); // Adjusted delay
        });
    }
    initializeMatterJS();
    initializeRiskPredictionChart();
}

// --- NEW: Function to reset the prediction form ---
function resetPredictionForm(hideForm = true) {
    const form = document.getElementById('prediction-form');
    const resultSection = document.getElementById('result-section');
    const selectionSection = document.getElementById('prediction-type-selection');
    const formSection = document.getElementById('prediction-form-section');
    
    // Hide result section
    if (!resultSection.classList.contains('hidden')) {
        anime({
            targets: resultSection,
            opacity: 0,
            translateY: 20,
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                resultSection.classList.add('hidden');
            }
        });
    }

    // Reset form fields
    form.reset();

    // Reset to step 1
    document.getElementById('step-3').classList.remove('active');
    document.getElementById('step-2').classList.remove('active');
    document.getElementById('step-1').classList.add('active');
    currentStep = 1;

    // Clear validation states
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
        const errorP = input.nextElementSibling;
        if (errorP && errorP.tagName === 'P') {
            errorP.classList.add('hidden');
        }
    });

    if (hideForm) {
        // Hide form and show selection
        anime({
            targets: formSection,
            opacity: 0,
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                formSection.classList.add('hidden');
                selectionSection.classList.remove('hidden');
                anime({
                    targets: selectionSection,
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            }
        });
    }
}

function getHealthSuggestions(type, score, inputs) {
    let suggestions = {
        title: "通用健康建议",
        items: []
    };

    // --- Base suggestions based on score ---
    if (score > 70) {
        suggestions.items.push("您的整体健康状况需要高度关注，建议进行全面的健康评估。");
    } else if (score > 40) {
        suggestions.items.push("您的生活方式存在一些风险因素，需要调整。");
    } else {
        suggestions.items.push("恭喜！您的综合健康状况良好，请继续保持。");
    }

    // --- Dynamic suggestions based on inputs ---
    if (inputs.smoking === '1') {
        suggestions.items.push("<strong>戒烟是首要任务</strong>：吸烟是多种严重疾病（包括心血管疾病和癌症）的明确危险因素。请立即寻求戒烟帮助。");
    }
    if (parseInt(inputs.exercise) < 3) {
        suggestions.items.push(`<strong>增加体力活动</strong>：您每周的运动次数（${inputs.exercise}次）较少。建议增加到每周至少3-5次，每次30分钟的中等强度运动。`);
    }
    if (parseInt(inputs.age) > 50) {
        suggestions.items.push("<strong>关注老年健康</strong>：随着年龄增长，定期进行针对性的健康筛查（如骨密度、癌症筛查）至关重要。");
    }


    // --- Type-specific titles and suggestions ---
    if (type === 'cardio') {
        suggestions.title = "心血管健康专属建议";
        if (inputs.bp > 130) {
            suggestions.items.push(`<strong>控制血压</strong>：您当前的收缩压（${inputs.bp}mmHg）偏高。请减少盐的摄入，并咨询医生。`);
        }
        if (inputs.chol > 200) {
            suggestions.items.push(`<strong>管理胆固醇</strong>：您的总胆固醇水平（${inputs.chol}mg/dL）较高。建议选择低饱和脂肪和高纤维的食物。`);
        }
        if (score > 70) {
            suggestions.items.unshift("**高风险警告**: 立即咨询医生，进行详细的心血管检查。");
            suggestions.items.push("严格控制盐和饱和脂肪的摄入，推荐地中海饮食。");
        } else if (score > 40) {
            suggestions.items.unshift("**中度风险提醒**: 建议预约医生进行咨询。");
            suggestions.items.push("减少红肉摄入，增加鱼类和坚果，补充Omega-3脂肪酸。");
        } else {
            suggestions.items.push("保持低盐低脂饮食，多吃全谷物和高纤维食物。");
        }
    } else if (type === 'diabetes') {
        suggestions.title = "糖尿病预防专属建议";
        if (inputs.bmi > 25) {
            suggestions.items.push(`<strong>管理体重</strong>：您的BMI指数（${inputs.bmi}）已超重。减重5-10%可以显著降低糖尿病风险。`);
        }
        if (inputs.bs > 100) {
            suggestions.items.push(`<strong>监测血糖</strong>：您的空腹血糖（${inputs.bs}mg/dL）偏高。请减少糖和精制碳水化合物的摄入。`);
        }
        if (score > 70) {
            suggestions.items.unshift("**高风险警告**: 强烈建议进行糖耐量测试（OGTT）。");
            suggestions.items.push("严格控制糖分和精制碳水化合物的摄入，学习计算食物升糖指数(GI)。");
        } else if (score > 40) {
            suggestions.items.unshift("**中度风险提醒**: 注意饮食结构，减少含糖饮料和甜点。");
            suggestions.items.push("增加膳食纤维摄入，有助于稳定血糖。");
        } else {
            suggestions.items.push("选择全谷物作为主食来源，避免长时间久坐。");
        }
    } else if (type === 'cancer') {
        suggestions.title = "癌症风险预防建议";
        if (inputs.family_history_cancer === '1') {
            suggestions.items.push("<strong>关注家族病史</strong>：您有癌症家族史，建议与医生讨论进行定期的、针对性的筛查。");
        }
        if (inputs.alcohol_consumption === '2') {
            suggestions.items.push("<strong>限制酒精摄入</strong>：频繁饮酒会增加多种癌症的风险。请考虑减少饮酒频率和量。");
        }
        if (score > 70) {
            suggestions.items.unshift("**高风险警告**: 建议根据具体风险因素咨询医生，进行专项筛查。");
            suggestions.items.push("避免食用加工肉类和烧烤、油炸食品。");
        } else if (score > 40) {
            suggestions.items.unshift("**中度风险提醒**: 增加饮食多样性，确保摄入足量的抗氧化物。");
            suggestions.items.push("注意防晒，避免过度紫外线暴露。");
        } else {
            suggestions.items.push("坚持健康、均衡的饮食，多吃高纤维食物。");
        }
    } else if (type === 'comprehensive') {
        suggestions.title = "综合健康提升建议";
        // General suggestions are already good for comprehensive
    }

    return `
        <h4 class="text-xl font-bold text-gray-800 mb-4">${suggestions.title}</h4>
        <ul class="space-y-3 text-gray-600">
            ${suggestions.items.map(item => `
                <li class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${item}</span>
                </li>
            `).join('')}
        </ul>
    `;
}

function showRiskResult(score, inputs) {
    hideLoading(); // 确保在显示结果前隐藏加载动画
    const formSection = document.getElementById('prediction-form-section');
    const resultSection = document.getElementById('result-section');
    
    // Hide form
    anime({
        targets: formSection,
        opacity: 0,
        duration: 300,
        easing: 'easeInExpo',
        complete: () => {
            formSection.classList.add('hidden');
        }
    });

    // Show result section
    resultSection.classList.remove('hidden');
    anime({
        targets: resultSection,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutExpo'
    });

    // Update score and level text
    const riskScoreValue = document.getElementById('risk-score-value');
    const riskLevelText = document.getElementById('risk-level-text');
    
    riskScoreValue.textContent = score;
    
    let riskLevel, riskColor;
    if (score > 70) {
        riskLevel = '高度风险';
        riskColor = 'bg-red-500 text-white';
    } else if (score > 40) {
        riskLevel = '中等风险';
        riskColor = 'bg-yellow-500 text-white';
    } else {
        riskLevel = '低度风险';
        riskColor = 'bg-green-500 text-white';
    }
    riskLevelText.textContent = riskLevel;
    riskLevelText.className = `text-xl font-semibold px-4 py-1 rounded-full inline-block ${riskColor}`;

    // Update explanation
    const riskExplanation = document.getElementById('risk-explanation').querySelector('p');
    riskExplanation.textContent = `您的评估结果显示为${riskLevel}。这意味着您当前的一些健康指标或生活习惯可能增加了未来患病的可能性。请关注以下根据您个人情况生成的建议以改善您的健康状况。`;

    // Generate and display personalized suggestions
    const suggestionsContainer = document.getElementById('health-suggestions');
    suggestionsContainer.innerHTML = getHealthSuggestions(selectedPredictionType, score, inputs);

    // Initialize chart
    initializeRiskPredictionChart(score);
}

function calculateRisk() {
    const form = document.getElementById('prediction-form');
    const formData = new FormData(form);
    const inputs = Object.fromEntries(formData.entries());
    let score = 0;

    // Base score from common factors
    score += (parseInt(inputs.age) - 20) * 0.5;
    if (inputs.smoking === '1') score += 10;
    if (inputs.gender === '1') score += 3; // Male risk factor for some diseases

    // Type-specific scoring
    switch(inputs['prediction-type']) {
        case 'cardio':
            if (inputs.bp > 130) score += (inputs.bp - 130) * 0.2;
            if (inputs.chol > 200) score += (inputs.chol - 200) * 0.1;
            if (inputs.hr > 80) score += (inputs.hr - 80) * 0.2;
            if (inputs.exercise < 3) score += (3 - inputs.exercise) * 3;
            break;
        case 'diabetes':
            if (inputs.bs > 100) score += (inputs.bs - 100) * 0.3;
            if (inputs.bmi > 25) score += (inputs.bmi - 25) * 1.5;
            if (inputs.hr > 80) score += (inputs.hr - 80) * 0.1;
            if (inputs.exercise < 3) score += (3 - inputs.exercise) * 2;
            break;
        case 'cancer':
            if (inputs.family_history_cancer === '1') score += 15;
            if (inputs.alcohol_consumption === '1') score += 5;
            if (inputs.alcohol_consumption === '2') score += 10;
            if (inputs.carcinogen_exposure === '1') score += 10;
            if (inputs.chronic_inflammation === '1') score += 8;
            break;
        case 'comprehensive':
             // Use a mix of factors for comprehensive score
            if (inputs.bp > 130) score += (inputs.bp - 130) * 0.1;
            if (inputs.bs > 100) score += (inputs.bs - 100) * 0.15;
            if (inputs.bmi > 25) score += (inputs.bmi - 25) * 1;
            if (inputs.exercise < 3) score += (3 - inputs.exercise) * 2;
            if (inputs.alcohol_consumption === '2') score += 5;
            break;
    }
    
    const finalScore = Math.min(Math.max(Math.round(score), 5), 99);
    
    // Return both score and inputs
    return { score: finalScore, inputs: inputs };
}

let riskChartInstance = null;

// --- NEW: Matter.js background for prediction.html ---
function initializeMatterJS() {
    const canvas = document.getElementById('matter-canvas');
    if (!canvas) return;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const world = engine.world;
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    const colors = ['#1e3a8a', '#10b981', '#f59e0b', '#374151'];
    for (let i = 0; i < 40; i++) {
        World.add(world, Bodies.circle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            Math.random() * 10 + 5,
            {
                restitution: 0.5,
                render: {
                    fillStyle: colors[Math.floor(Math.random() * colors.length)]
                }
            }
        ));
    }

    // Add walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(world, [
        Bodies.rectangle(window.innerWidth / 2, -25, window.innerWidth, 50, wallOptions),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, wallOptions),
        Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, wallOptions),
        Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, wallOptions)
    ]);
    
    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    World.add(world, mouseConstraint);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        // Re-center walls
        Matter.Body.setPosition(world.bodies[world.bodies.length - 4], { x: window.innerWidth / 2, y: -25 });
        Matter.Body.setPosition(world.bodies[world.bodies.length - 3], { x: window.innerWidth / 2, y: window.innerHeight + 25 });
        Matter.Body.setPosition(world.bodies[world.bodies.length - 2], { x: -25, y: window.innerHeight / 2 });
        Matter.Body.setPosition(world.bodies[world.bodies.length - 1], { x: window.innerWidth + 25, y: window.innerHeight / 2 });
    });
}


// 计算风险评分
function calculateRisk_old() {
    const formData = new FormData(document.getElementById('prediction-form'));
    const data = Object.fromEntries(formData.entries());
    const type = data['prediction-type'];

    let score = 10; // Base score

    // Common factors
    if (data.age > 40) score += (data.age - 40) * 0.5;
    if (data.gender === '1') score += 5; // Male risk factor for some diseases
    if (data.smoking === '1') score += 15;

    // Type-specific calculations
    switch (type) {
        case 'cardiovascular':
            if (data.bp > 130) score += (data.bp - 130) / 2;
            if (data.chol > 200) score += (data.chol - 200) / 5;
            if (data.hr > 80) score += (data.hr - 80) / 2;
            if (data.exercise < 3) score += (3 - data.exercise) * 5;
            break;
        case 'diabetes':
            if (data.bs > 100) score += (data.bs - 100);
            if (data.bmi > 25) score += (data.bmi - 25) * 2;
            if (data.hr > 80) score += (data.hr - 80) / 3;
            if (data.exercise < 3) score += (3 - data.exercise) * 4;
            break;
        case 'cancer':
            if (data.family_history_cancer === '1') score += 20;
            if (data.alcohol_consumption === '1') score += 10; // Occasional
            if (data.alcohol_consumption === '2') score += 25; // Frequent
            if (data.age > 50) score += (data.age - 50);
            break;
        case 'respiratory':
            if (data.air_pollution_exposure === '1') score += 25;
            if (data.chronic_cough === '1') score += 20;
            if (data.smoking === '1') score += 10; // Additional penalty for smoking
            break;
    }

    return Math.min(Math.max(Math.round(score), 0), 100); // Clamp score between 0 and 100
}

// 显示风险结果
function showRiskResult_old(score) {
    const scoreValue = document.getElementById('risk-score-value');
    const levelText = document.getElementById('risk-level-text');
    const explanation = document.getElementById('risk-explanation').querySelector('p');
    const suggestionsContainer = document.getElementById('health-suggestions');

    if (!scoreValue || !levelText || !explanation || !suggestionsContainer) return;

    scoreValue.textContent = score;
    let level, color, explanationText, suggestions;

    if (score < 40) {
        level = '低风险';
        color = 'bg-green-100 text-green-800';
        explanationText = '您的评估结果为低风险。这表明您当前的健康状况和生活习惯良好。请继续保持！';
        suggestions = [
            '<li><span class="font-semibold">保持均衡饮食：</span>继续摄入充足的蔬菜、水果和全谷物。</li>',
            '<li><span class="font-semibold">坚持规律运动：</span>建议每周进行至少150分钟的中等强度运动。</li>',
            '<li><span class="font-semibold">定期健康检查：</span>每年进行一次全面体检，以便及早发现潜在问题。</li>'
        ];
    } else if (score < 70) {
        level = '中等风险';
        color = 'bg-yellow-100 text-yellow-800';
        explanationText = '您的评估结果为中等风险。您当前的一些健康指标或生活习惯可能增加了未来患病的可能性。请关注以下建议。';
        suggestions = [
            '<li><span class="font-semibold">关注血压和胆固醇：</span>建议定期监测，并咨询医生是否需要药物干预。</li>',
            '<li><span class="font-semibold">调整饮食结构：</span>减少高盐、高糖和高脂肪食物的摄入。</li>',
            '<li><span class="font-semibold">增加运动量：</span>如果运动不足，尝试每周增加1-2天的运动日。</li>'
        ];
    } else {
        level = '高风险';
        color = 'bg-red-100 text-red-800';
        explanationText = '您的评估结果为高风险。强烈建议您咨询医生并进行全面健康检查。您的健康指标和生活方式存在明显风险因素。';
        suggestions = [
            '<li><span class="font-semibold">立即咨询医生：</span>与您的医生讨论评估结果，并制定详细的干预计划。</li>',
            '<li><span class="font-semibold">严格控制饮食：</span>在营养师或医生指导下，制定并执行健康的饮食计划。</li>',
            '<li><span class="font-semibold">戒烟限酒：</span>如果您吸烟或饮酒，请立即开始戒烟并限制酒精摄入。</li>'
        ];
    }

    levelText.textContent = level;
    levelText.className = `text-xl font-semibold px-4 py-1 rounded-full inline-block ${color}`;
    explanation.textContent = explanationText;
    suggestionsContainer.innerHTML = suggestions.join('');

    // 更新图表
    const riskChart = echarts.getInstanceByDom(document.getElementById('risk-prediction-chart'));
    if (riskChart) {
        riskChart.setOption({
            series: [{
                data: [{
                    value: score,
                    name: '风险评分'
                }]
            }]
        });
    }
}

// 加载动画
function showLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        loading.classList.remove('hidden');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        loading.classList.add('hidden');
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