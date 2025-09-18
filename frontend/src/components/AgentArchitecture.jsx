import React, { useState } from 'react';
import './AgentArchitecture.css';
import { useTranslation, LanguageSwitcher } from '../hooks/useTranslation';

const AgentArchitecture = () => {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]); // 多智能体选择
  const [activeSendAgent, setActiveSendAgent] = useState(null);
  const [sendMessage, setSendMessage] = useState('');
  const [interactionHistory, setInteractionHistory] = useState([]); // 交互记录
  const [isMultiAgentMode, setIsMultiAgentMode] = useState(false); // 多智能体模式

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // 多智能体选择功能
  const toggleAgentSelection = (agent) => {
    if (isMultiAgentMode) {
      setSelectedAgents(prev => {
        const isSelected = prev.some(a => a.id === agent.id);
        if (isSelected) {
          return prev.filter(a => a.id !== agent.id);
        } else {
          return [...prev, agent];
        }
      });
    } else {
      setSelectedAgent(agent);
    }
  };

  // Multi-Agent DSL Framework 核心原语
  const dslPrimitives = {
    // 事件处理原语
    EVENT_ROUTE: {
      name: "EVENT_ROUTE",
      description: "事件路由原语 - 智能路由复杂事件到合适的智能体",
      syntax: "EVENT_ROUTE(event_type, priority, target_agents)",
      example: "EVENT_ROUTE('traffic_incident', 'high', ['traffic_manager', 'safety_agent'])"
    },
    CACHE_OPTIMIZE: {
      name: "CACHE_OPTIMIZE", 
      description: "缓存优化原语 - 优化智能体间数据缓存和共享",
      syntax: "CACHE_OPTIMIZE(cache_strategy, ttl, agents)",
      example: "CACHE_OPTIMIZE('distributed', 300, ['perception', 'weather'])"
    },
    SYSTEM_SCHEDULE: {
      name: "SYSTEM_SCHEDULE",
      description: "系统调度原语 - 协调多智能体执行顺序和资源分配", 
      syntax: "SYSTEM_SCHEDULE(task_queue, resource_limit, execution_order)",
      example: "SYSTEM_SCHEDULE(['analyze', 'optimize', 'execute'], 'cpu:80%', 'sequential')"
    },
    AGENT_COLLABORATE: {
      name: "AGENT_COLLABORATE",
      description: "智能体协作原语 - 实现智能体间的实时协作和通信",
      syntax: "AGENT_COLLABORATE(collaboration_type, participants, protocol)",
      example: "AGENT_COLLABORATE('consensus', ['traffic', 'safety'], 'broadcast')"
    },
    LLM_DRIVE: {
      name: "LLM_DRIVE",
      description: "LLM驱动原语 - 利用大语言模型进行智能决策和任务分解",
      syntax: "LLM_DRIVE(prompt_template, context, output_format)",
      example: "LLM_DRIVE('analyze_traffic_pattern', sensor_data, 'json')"
    }
  };

  // 完整的Multi-Agent协作逻辑链条
  const multiAgentWorkflow = {
    // 1. 领导接收任务 - Master Agent接收用户任务
    receiveTask: (userTask) => {
      return {
        phase: "LEADER_RECEIVE_TASK",
        dsl: dslPrimitives.EVENT_ROUTE,
        description: "Master智能体接收用户任务，使用EVENT_ROUTE原语进行事件路由",
        participants: ["Master Agent"],
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 2. 开会商量对策 - Master Agent分析任务并制定策略
    analyzeAndPlan: (task) => {
      return {
        phase: "MEETING_ANALYSIS", 
        dsl: dslPrimitives.LLM_DRIVE,
        description: "Master智能体使用LLM_DRIVE原语分析任务，制定协作策略",
        participants: ["Master Agent"],
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 3. 布置任务 - Master Agent分配任务给子智能体
    distributeTasks: (strategy, agents) => {
      return {
        phase: "TASK_DISTRIBUTION",
        dsl: dslPrimitives.SYSTEM_SCHEDULE,
        description: "Master智能体使用SYSTEM_SCHEDULE原语分配任务，确定执行顺序",
        participants: ["Master Agent", ...agents.map(a => a.name)],
        status: "active", 
        timestamp: new Date().toLocaleString()
      };
    },

    // 4. 相互交流 - 子智能体间协作通信
    agentCollaboration: (agents, task) => {
      return {
        phase: "AGENT_COLLABORATION",
        dsl: dslPrimitives.AGENT_COLLABORATE,
        description: "子智能体使用AGENT_COLLABORATE原语进行实时协作",
        participants: agents.map(a => a.name),
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 5. 合作完成任务 - 子智能体执行具体任务
    executeTasks: (agents, tasks) => {
      return {
        phase: "TASK_EXECUTION",
        dsl: dslPrimitives.CACHE_OPTIMIZE,
        description: "子智能体使用CACHE_OPTIMIZE原语优化数据共享，执行任务",
        participants: agents.map(a => a.name),
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 6. 遇到问题汇报 - 子智能体向Master汇报问题
    reportIssues: (agent, issue) => {
      return {
        phase: "ISSUE_REPORTING",
        dsl: dslPrimitives.EVENT_ROUTE,
        description: `${agent.name}使用EVENT_ROUTE原语向Master智能体汇报问题`,
        participants: [agent.name, "Master Agent"],
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 7. 找到解决方式 - Master Agent重新分配任务
    resolveIssues: (issue, solution) => {
      return {
        phase: "ISSUE_RESOLUTION",
        dsl: dslPrimitives.LLM_DRIVE,
        description: "Master智能体使用LLM_DRIVE原语分析问题，制定解决方案",
        participants: ["Master Agent"],
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 8. 重新分配任务 - Master Agent调整任务分配
    redistributeTasks: (newStrategy, agents) => {
      return {
        phase: "TASK_REDISTRIBUTION", 
        dsl: dslPrimitives.SYSTEM_SCHEDULE,
        description: "Master智能体使用SYSTEM_SCHEDULE原语重新分配任务",
        participants: ["Master Agent", ...agents.map(a => a.name)],
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 9. 最终解决任务 - 子智能体完成最终任务
    finalExecution: (agents, finalTasks) => {
      return {
        phase: "FINAL_EXECUTION",
        dsl: dslPrimitives.AGENT_COLLABORATE,
        description: "子智能体使用AGENT_COLLABORATE原语协作完成最终任务",
        participants: agents.map(a => a.name),
        status: "active",
        timestamp: new Date().toLocaleString()
      };
    },

    // 10. 开会复盘 - Master Agent总结和广播结果
    finalReview: (results, agents) => {
      return {
        phase: "FINAL_REVIEW",
        dsl: dslPrimitives.EVENT_ROUTE,
        description: "Master智能体使用EVENT_ROUTE原语广播最终结果，进行复盘",
        participants: ["Master Agent", ...agents.map(a => a.name)],
        status: "completed",
        timestamp: new Date().toLocaleString()
      };
    }
  };

  // 任务复杂度分析
  const analyzeTaskComplexity = (task) => {
    const keywords = task.toLowerCase();
    if (keywords.includes('紧急') || keywords.includes('urgent')) return 'high';
    if (keywords.includes('复杂') || keywords.includes('complex')) return 'high';
    if (keywords.includes('简单') || keywords.includes('simple')) return 'low';
    return 'medium';
  };

  // 识别所需智能体
  const identifyRequiredAgents = (task) => {
    const keywords = task.toLowerCase();
    const required = [];
    
    if (keywords.includes('交通') || keywords.includes('traffic')) required.push('traffic');
    if (keywords.includes('安全') || keywords.includes('safety')) required.push('safety');
    if (keywords.includes('天气') || keywords.includes('weather')) required.push('weather');
    if (keywords.includes('停车') || keywords.includes('parking')) required.push('parking');
    if (keywords.includes('感知') || keywords.includes('perception')) required.push('perception');
    if (keywords.includes('应急') || keywords.includes('emergency')) required.push('ems');
    if (keywords.includes('执法') || keywords.includes('enforcement')) required.push('enforcement');
    if (keywords.includes('清洁') || keywords.includes('sanitation')) required.push('sanitation');
    
    return required.length > 0 ? required : ['traffic', 'safety']; // 默认组合
  };

  // 确定优先级
  const determinePriority = (task) => {
    const keywords = task.toLowerCase();
    if (keywords.includes('紧急') || keywords.includes('urgent')) return 'critical';
    if (keywords.includes('重要') || keywords.includes('important')) return 'high';
    return 'normal';
  };

  // 估算执行时间
  const estimateExecutionTime = (task) => {
    const complexity = analyzeTaskComplexity(task);
    const baseTime = complexity === 'high' ? 8000 : complexity === 'medium' ? 5000 : 3000;
    return baseTime + Math.random() * 2000;
  };

  // 识别依赖关系
  const identifyDependencies = (task) => {
    return ['data_sync', 'system_check']; // 基础依赖
  };

  // 生成协调计划
  const generateCoordinationPlan = (analysis) => {
    const plans = [];
    
    analysis.requiredAgents.forEach(agentType => {
      plans.push({
        agentType,
        subTask: generateSubTask(agentType, analysis.originalTask),
        parameters: generateParameters(agentType),
        dependencies: [],
        expectedOutput: generateExpectedOutput(agentType),
        timeout: 5000
      });
    });
    
    return plans;
  };

  // 生成子任务
  const generateSubTask = (agentType, originalTask) => {
    const taskMap = {
      traffic: `分析交通状况并优化路线规划 - 基于任务：${originalTask}`,
      safety: `执行安全检查并识别潜在风险 - 基于任务：${originalTask}`,
      weather: `获取天气数据并评估环境条件 - 基于任务：${originalTask}`,
      parking: `分析停车位状况并推荐最优位置 - 基于任务：${originalTask}`,
      perception: `更新环境感知数据并识别目标 - 基于任务：${originalTask}`,
      ems: `检查应急响应系统并准备资源 - 基于任务：${originalTask}`,
      enforcement: `激活执法监控并检测违规行为 - 基于任务：${originalTask}`,
      sanitation: `监控环境清洁状况并优化路线 - 基于任务：${originalTask}`
    };
    return taskMap[agentType] || `执行相关任务 - 基于任务：${originalTask}`;
  };

  // 生成参数
  const generateParameters = (agentType) => {
    const paramMap = {
      traffic: { area: 'city_center', timeWindow: '30min', priority: 'high' },
      safety: { riskLevel: 'medium', checkRadius: '500m', alertThreshold: '0.8' },
      weather: { location: 'current', forecastHours: 24, accuracy: 'high' },
      parking: { searchRadius: '1km', priceRange: 'any', availability: 'real-time' },
      perception: { detectionRange: '200m', accuracy: '98%', updateFreq: '1s' },
      ems: { responseTime: '<2min', resourceLevel: 'high', coverage: '100%' },
      enforcement: { violationTypes: 'all', detectionRate: '95%', penaltyLevel: 'standard' },
      sanitation: { airQuality: 'monitor', routeOptimization: 'enabled', schedule: 'dynamic' }
    };
    return paramMap[agentType] || {};
  };

  // 生成期望输出
  const generateExpectedOutput = (agentType) => {
    const outputMap = {
      traffic: '优化路线建议和交通状况报告',
      safety: '安全评估报告和风险预警',
      weather: '天气数据和环境条件评估',
      parking: '停车位推荐和可用性报告',
      perception: '环境感知数据和目标识别结果',
      ems: '应急响应状态和资源分配报告',
      enforcement: '执法监控数据和违规记录',
      sanitation: '环境清洁状况和优化建议'
    };
    return outputMap[agentType] || '任务执行结果';
  };

  // 确定执行顺序
  const determineExecutionOrder = (analysis) => {
    const order = [];
    if (analysis.requiredAgents.includes('perception')) order.push('perception');
    if (analysis.requiredAgents.includes('weather')) order.push('weather');
    if (analysis.requiredAgents.includes('traffic')) order.push('traffic');
    if (analysis.requiredAgents.includes('safety')) order.push('safety');
    if (analysis.requiredAgents.includes('parking')) order.push('parking');
    return order;
  };

  // 分配资源
  const allocateResources = (analysis) => {
    return {
      cpu: analysis.complexity === 'high' ? '80%' : '60%',
      memory: analysis.complexity === 'high' ? '2GB' : '1GB',
      network: 'high',
      priority: analysis.priority
    };
  };

  // 定义监控点
  const defineMonitoringPoints = (analysis) => {
    return analysis.requiredAgents.map(agent => ({
      agent,
      checkpoint: `${agent}_status_check`,
      interval: '5s',
      alertThreshold: 'error_rate > 5%'
    }));
  };

  // 创建备用计划
  const createFallbackPlan = (analysis) => {
    return {
      primaryFailure: 'switch_to_backup_agents',
      timeoutAction: 'escalate_to_human_operator',
      resourceExhaustion: 'reduce_task_scope',
      communicationFailure: 'use_offline_mode'
    };
  };

  // 启动Multi-Agent DSL Framework完整协作流程
  const startMultiAgentCollaboration = () => {
    if (selectedAgents.length < 2) {
      alert('请至少选择2个智能体进行协作');
      return;
    }
    
    // 用户友好的任务输入界面
    const taskTemplates = [
      "🚦 优化城市交通流量，确保行车安全",
      "🌧️ 处理恶劣天气下的应急响应",
      "🅿️ 智能停车位分配和路线规划", 
      "🚨 处理交通事故和紧急救援",
      "🌱 环境监测和清洁路线优化",
      "📊 城市数据分析和决策支持"
    ];
    
    const userTask = prompt(`请选择或输入要执行的任务：\n\n${taskTemplates.map((template, index) => `${index + 1}. ${template}`).join('\n')}\n\n请输入数字选择模板，或直接输入自定义任务:`) || taskTemplates[0];
    
    const finalTask = userTask.match(/^\d+$/) ? 
      (taskTemplates[parseInt(userTask) - 1] || taskTemplates[0]) : 
      userTask;
    
    // 开始完整的Multi-Agent协作逻辑链条
    executeCompleteWorkflow(finalTask, selectedAgents);
  };

  // 执行完整的协作工作流程
  const executeCompleteWorkflow = async (userTask, agents) => {
    const workflowId = Date.now();
    
    // 1. 领导接收任务
    const step1 = multiAgentWorkflow.receiveTask(userTask);
    addWorkflowStep(workflowId, step1, "Master智能体接收任务", "👑 Master智能体亮起，开始接收用户任务");
    await delay(1500);
    
    // 2. 开会商量对策
    const step2 = multiAgentWorkflow.analyzeAndPlan(userTask);
    addWorkflowStep(workflowId, step2, "Master智能体分析任务", "🧠 Master智能体使用LLM分析任务，制定协作策略");
    await delay(2000);
    
    // 3. 布置任务
    const step3 = multiAgentWorkflow.distributeTasks("strategy", agents);
    addWorkflowStep(workflowId, step3, "Master智能体分配任务", "📋 Master智能体向子智能体分配具体任务");
    await delay(1500);
    
    // 4. 相互交流
    const step4 = multiAgentWorkflow.agentCollaboration(agents, userTask);
    addWorkflowStep(workflowId, step4, "子智能体协作交流", "💬 子智能体开始协作交流，共享信息");
    await delay(2000);
    
    // 5. 合作完成任务
    const step5 = multiAgentWorkflow.executeTasks(agents, "tasks");
    addWorkflowStep(workflowId, step5, "子智能体执行任务", "⚡ 子智能体开始执行具体任务");
    await delay(2500);
    
    // 6. 遇到问题汇报（模拟）
    const reportingAgent = agents.length > 0 ? agents[Math.floor(Math.random() * agents.length)] : null;
    if (reportingAgent) {
      const step6 = multiAgentWorkflow.reportIssues(reportingAgent, "发现数据异常");
      addWorkflowStep(workflowId, step6, `${reportingAgent.name}汇报问题`, `⚠️ ${reportingAgent.name}向Master智能体汇报问题`);
    }
    await delay(1500);
    
    // 7. 找到解决方式
    const step7 = multiAgentWorkflow.resolveIssues("数据异常", "调整算法参数");
    addWorkflowStep(workflowId, step7, "Master智能体制定解决方案", "🔧 Master智能体分析问题，制定解决方案");
    await delay(2000);
    
    // 8. 重新分配任务
    const step8 = multiAgentWorkflow.redistributeTasks("new_strategy", agents);
    addWorkflowStep(workflowId, step8, "Master智能体重新分配任务", "🔄 Master智能体重新分配任务，调整执行策略");
    await delay(1500);
    
    // 9. 最终解决任务
    const step9 = multiAgentWorkflow.finalExecution(agents, "final_tasks");
    addWorkflowStep(workflowId, step9, "子智能体完成最终任务", "✅ 子智能体协作完成最终任务");
    await delay(2000);
    
    // 10. 开会复盘
    const step10 = multiAgentWorkflow.finalReview("results", agents);
    addWorkflowStep(workflowId, step10, "Master智能体总结复盘", "📊 Master智能体广播最终结果，进行复盘总结");
  };

  // 添加工作流步骤到交互记录
  const addWorkflowStep = (workflowId, step, title, description) => {
    // 确保step对象有必要的属性
    if (!step || !step.participants || !step.dsl) {
      console.error('Invalid step object:', step);
      return;
    }
    
    const interaction = {
      id: Date.now() + Math.random(),
      workflowId: workflowId,
      type: 'workflow_step',
      phase: step.phase || 'UNKNOWN',
      dsl: step.dsl,
      agents: step.participants.map(name => ({ name, role: name === 'Master Agent' ? 'Master Agent' : 'Sub Agent' })),
      message: title,
      description: description,
      timestamp: step.timestamp || new Date().toLocaleString(),
      status: step.status || 'active',
      response: {
        summary: step.description || '步骤执行完成',
        details: [
          `DSL原语: ${step.dsl.name || 'UNKNOWN'}`,
          `语法: ${step.dsl.syntax || 'N/A'}`,
          `示例: ${step.dsl.example || 'N/A'}`,
          `参与者: ${step.participants.join(', ')}`
        ],
        result: `阶段 ${step.phase || 'UNKNOWN'} 执行完成`,
        dsl: {
          primitive: step.dsl.name || 'UNKNOWN',
          syntax: step.dsl.syntax || 'N/A',
          example: step.dsl.example || 'N/A',
          description: step.dsl.description || 'N/A'
        }
      }
    };
    
    setInteractionHistory(prev => [interaction, ...prev]);
  };

  // 延迟函数
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 执行子智能体任务
  const executeSubAgentTasks = (decomposedTasks, agents) => {
    decomposedTasks.forEach((task, index) => {
      const agent = agents.find(a => a.role.toLowerCase().includes(task.agentType));
      if (!agent) return;
      
      const taskId = Date.now() + index;
      const taskInteraction = {
        id: taskId,
        type: 'sub_agent_task',
        agents: [agent],
        message: `子任务执行：${task.subTask}`,
        timestamp: new Date().toLocaleString(),
        status: 'processing',
        dsl: {
          taskId: task.taskId,
          parameters: task.parameters,
          expectedOutput: task.expectedOutput,
          timeout: task.timeout
        }
      };
      
      setInteractionHistory(prev => [taskInteraction, ...prev]);
      
      // 模拟子智能体执行过程
      setTimeout(() => {
        setInteractionHistory(prev => 
          prev.map(interaction => 
            interaction.id === taskId 
              ? { ...interaction, status: 'completed', response: generateSubAgentResponse(agent, task) }
              : interaction
          )
        );
      }, 3000 + index * 1000);
    });
  };

  // 生成子智能体响应
  const generateSubAgentResponse = (agent, task) => {
    const role = agent.role.toLowerCase();
    const name = agent.name;
    
    let response = '';
    let apiCall = '';
    
    if (role.includes('traffic')) {
      response = `交通分析完成 - 检测到3条拥堵路段，已规划最优绕行路线，预计节省15分钟通行时间`;
      apiCall = '调用交通API：GET /api/traffic/optimize?area=city_center&timeWindow=30min';
    } else if (role.includes('safety')) {
      response = `安全检查完成 - 识别2个潜在风险点，已启动预警机制，安全等级：优秀`;
      apiCall = '调用安全API：POST /api/safety/check?radius=500m&threshold=0.8';
    } else if (role.includes('weather')) {
      response = `天气数据获取 - 当前温度22°C，湿度65%，能见度良好，适合自动驾驶`;
      apiCall = '调用天气API：GET /api/weather/current?location=city_center&forecast=24h';
    } else if (role.includes('parking')) {
      response = `停车位分析 - 发现5个可用停车位，推荐距离最近的高质量停车点`;
      apiCall = '调用停车API：GET /api/parking/search?radius=1km&availability=real-time';
    } else if (role.includes('perception')) {
      response = `环境感知更新 - 检测到12个移动目标，识别准确率98.5%，数据同步完成`;
      apiCall = '调用感知API：POST /api/perception/update?range=200m&accuracy=98%';
    } else {
      response = `任务处理完成 - 系统运行正常，状态良好`;
      apiCall = '调用系统API：GET /api/system/status';
    }
    
    return {
      summary: `${name} 任务执行完成`,
      details: [response],
      result: '子智能体任务执行成功',
      apiCall: apiCall,
      dsl: {
        agentType: task.agentType,
        taskId: task.taskId,
        parameters: task.parameters,
        output: task.expectedOutput
      }
    };
  };

  // 发送协作消息
  const handleCollaborationMessage = () => {
    if (!sendMessage.trim() || selectedAgents.length === 0) return;
    
    const collaborationId = Date.now();
    const newInteraction = {
      id: collaborationId,
      type: 'collaboration_message',
      agents: selectedAgents,
      message: sendMessage,
      timestamp: new Date().toLocaleString(),
      status: 'processing'
    };
    
    setInteractionHistory(prev => [newInteraction, ...prev]);
    setSendMessage('');
    
    // 模拟多智能体处理过程
    setTimeout(() => {
      setInteractionHistory(prev => 
        prev.map(interaction => 
          interaction.id === collaborationId 
            ? { ...interaction, status: 'completed', response: generateMultiAgentResponse(selectedAgents, sendMessage) }
            : interaction
        )
      );
    }, 2000);
  };

  // 生成多智能体响应
  const generateMultiAgentResponse = (agents, message) => {
    const responses = agents.map(agent => {
      const role = agent.role.toLowerCase();
      const name = agent.name;
      
      if (role.includes('traffic')) {
        return `${name}: 交通分析完成 - 检测到3条拥堵路段，已规划最优绕行路线，预计节省15分钟通行时间`;
      } else if (role.includes('safety')) {
        return `${name}: 安全检查完成 - 识别2个潜在风险点，已启动预警机制，安全等级：优秀`;
      } else if (role.includes('perception')) {
        return `${name}: 环境感知更新 - 检测到12个移动目标，识别准确率98.5%，数据同步完成`;
      } else if (role.includes('weather')) {
        return `${name}: 天气数据获取 - 当前温度22°C，湿度65%，能见度良好，适合自动驾驶`;
      } else if (role.includes('parking')) {
        return `${name}: 停车位分析 - 发现5个可用停车位，推荐距离最近的高质量停车点`;
      } else if (role.includes('city')) {
        return `${name}: 城市管理协调 - 整合各子系统数据，城市运行状态：正常`;
      } else if (role.includes('ems')) {
        return `${name}: 应急响应就绪 - 系统监控正常，响应时间<2秒，应急资源充足`;
      } else if (role.includes('enforcement')) {
        return `${name}: 执法监控激活 - 违规检测系统运行中，已记录3起轻微违规`;
      } else if (role.includes('sanitation')) {
        return `${name}: 环境清洁监控 - 空气质量指数：良好，清洁路线已优化`;
      } else if (role.includes('sprinkler')) {
        return `${name}: 灌溉系统控制 - 土壤湿度检测正常，智能灌溉已启动`;
      } else {
        return `${name}: 任务处理完成 - 系统运行正常，状态良好`;
      }
    });
    
    // 根据智能体组合生成协作总结
    const agentRoles = agents.map(agent => agent.role.toLowerCase());
    let summary = '';
    let result = '';
    
    if (agentRoles.some(role => role.includes('traffic')) && agentRoles.some(role => role.includes('safety'))) {
      summary = `交通安全协作完成：${agents.map(a => a.name).join(' + ')}`;
      result = '交通流量优化成功，安全等级提升，系统运行稳定';
    } else if (agentRoles.some(role => role.includes('perception')) && agentRoles.some(role => role.includes('weather'))) {
      summary = `环境感知协作完成：${agents.map(a => a.name).join(' + ')}`;
      result = '环境数据整合成功，感知精度提升，决策支持增强';
    } else if (agentRoles.some(role => role.includes('parking')) && agentRoles.some(role => role.includes('traffic'))) {
      summary = `停车交通协作完成：${agents.map(a => a.name).join(' + ')}`;
      result = '停车位分配优化，交通流协调成功，用户体验提升';
    } else {
      summary = `多智能体协作完成：${agents.map(a => a.name).join(' + ')}`;
      result = '所有智能体任务执行成功，系统状态良好，协作效率提升';
    }
    
    return {
      summary,
      details: responses,
      result
    };
  };

  const openSendInterface = (agent, event) => {
    event.stopPropagation();
    setActiveSendAgent(agent);
    setSendMessage('');
  };

  const closeSendInterface = () => {
    setActiveSendAgent(null);
    setSendMessage('');
  };

  const handleSendMessage = () => {
    if (sendMessage.trim() && activeSendAgent) {
      // 创建交互记录
      const interactionId = Date.now();
      const interaction = {
        id: interactionId,
        type: 'single_agent_message',
        agents: [activeSendAgent],
        message: sendMessage,
        timestamp: new Date().toLocaleString(),
        status: 'processing',
        response: null
      };
      
      // 添加到交互记录
      setInteractionHistory(prev => [interaction, ...prev]);
      
      // 模拟智能体响应
      setTimeout(() => {
        const response = generateSingleAgentResponse(activeSendAgent, sendMessage);
        setInteractionHistory(prev => 
          prev.map(item => 
            item.id === interactionId 
              ? { ...item, status: 'completed', response: response }
              : item
          )
        );
      }, 2000);
      
      closeSendInterface();
    }
  };

  // 生成单个智能体响应
  const generateSingleAgentResponse = (agent, message) => {
    const role = agent.role.toLowerCase();
    const name = agent.name;
    
    let response = '';
    let apiCall = '';
    let dslPrimitive = null;
    
    if (role.includes('traffic')) {
      response = `交通管理响应 - 已分析您的请求"${message}"，正在优化交通信号时序，预计减少15%的等待时间`;
      apiCall = '调用交通API：POST /api/traffic/signal-optimize?area=city_center&message=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.SYSTEM_SCHEDULE;
    } else if (role.includes('safety')) {
      response = `安全监测响应 - 已处理您的安全请求"${message}"，启动实时监控，安全等级：优秀`;
      apiCall = '调用安全API：GET /api/safety/monitor?request=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.EVENT_ROUTE;
    } else if (role.includes('weather')) {
      response = `天气监测响应 - 已分析您的天气查询"${message}"，当前天气良好，适合出行`;
      apiCall = '调用天气API：GET /api/weather/query?location=city_center&query=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.CACHE_OPTIMIZE;
    } else if (role.includes('parking')) {
      response = `停车管理响应 - 已处理您的停车请求"${message}"，找到3个可用停车位，推荐最近位置`;
      apiCall = '调用停车API：GET /api/parking/search?query=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.AGENT_COLLABORATE;
    } else if (role.includes('perception')) {
      response = `环境感知响应 - 已分析您的感知请求"${message}"，检测到8个目标，识别准确率98.5%`;
      apiCall = '调用感知API：POST /api/perception/analyze?request=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.LLM_DRIVE;
    } else {
      response = `智能体响应 - 已处理您的请求"${message}"，系统运行正常，任务执行完成`;
      apiCall = '调用系统API：POST /api/system/process?message=' + encodeURIComponent(message);
      dslPrimitive = dslPrimitives.SYSTEM_SCHEDULE;
    }
    
    return {
      summary: `${name} 响应完成`,
      details: [response],
      result: '智能体任务执行成功',
      apiCall: apiCall,
      dsl: dslPrimitive ? {
        primitive: dslPrimitive.name,
        syntax: dslPrimitive.syntax,
        example: dslPrimitive.example,
        description: dslPrimitive.description
      } : null
    };
  };

  const handleWheel = (e) => {
    // 移除旋转功能，保持正常显示
    e.preventDefault();
  };

  // SVG Icons as React Components
  const AutonomousDrivingIcon = () => (
    <span className="agent-emoji-icon">🚗</span>
  );

  const TrafficIcon = () => (
    <span className="agent-emoji-icon">🚦</span>
  );

  const WeatherIcon = () => (
    <span className="agent-emoji-icon">🌤️</span>
  );

  const ParkingIcon = () => (
    <span className="agent-emoji-icon">🅿️</span>
  );

  const SafetyIcon = () => (
    <span className="agent-emoji-icon">🛡️</span>
  );

  const EMSIcon = () => (
    <span className="agent-emoji-icon">🚑</span>
  );

  const EnforcementIcon = () => (
    <span className="agent-emoji-icon">👮</span>
  );

  const SanitationIcon = () => (
    <span className="agent-emoji-icon">🗑️</span>
  );

  const SprinklerIcon = () => (
    <span className="agent-emoji-icon">💧</span>
  );

  const PerceptionIcon = () => (
    <span className="agent-emoji-icon">👁️</span>
  );

  const TrafficIncidentIcon = () => (
    <span className="agent-emoji-icon">⚠️</span>
  );

  const RerouteIcon = () => (
    <span className="agent-emoji-icon">🔄</span>
  );

  const TrafficMonitorIcon = () => (
    <span className="agent-emoji-icon">📹</span>
  );

  const MasterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="agent-svg-icon">
      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const agents = [
    {
      id: 'autonomous-driving',
      name: 'Autonomous Driving Manager',
      role: '自动驾驶管理智能体',
      icon: AutonomousDrivingIcon,
      color: 'autonomous-driving',
      functions: ['路径规划 / Path Planning', '交通流控制 / Traffic Flow Control', '安全监控 / Safety Monitoring', '实时决策 / Real-time Decision'],
      description: '负责管理城市自动驾驶车辆，优化交通流量，确保行车安全。Manages urban autonomous vehicles, optimizes traffic flow, and ensures driving safety.',
      details: '通过AI算法实时分析交通状况，为自动驾驶车辆提供最优路径规划，协调车辆间的交互，处理紧急情况。Uses AI algorithms to analyze traffic conditions in real-time, providing optimal path planning for autonomous vehicles, coordinating vehicle interactions, and handling emergency situations.',
      position: { angle: 0, radius: 250 } // 12点钟方向
    },
    {
      id: 'traffic-manager',
      name: 'Traffic Manager',
      role: '交通管理子智能体',
      icon: TrafficIcon,
      color: 'traffic',
      functions: ['信号控制 / Signal Control', '拥堵监测 / Congestion Monitoring', '流量优化 / Flow Optimization', '事故处理 / Incident Handling'],
      description: '智能交通信号控制，实时监测交通状况，优化交通流量。Intelligent traffic signal control, real-time traffic monitoring, and traffic flow optimization.',
      details: '通过传感器网络实时监测交通流量，动态调整信号灯时序，减少拥堵，提高通行效率。Monitors traffic flow in real-time through sensor networks, dynamically adjusts signal timing, reduces congestion, and improves traffic efficiency.',
      position: { angle: 30, radius: 250 } // 1点钟方向
    },
    {
      id: 'weather-monitor',
      name: 'Weather Monitor',
      role: '天气监测子智能体',
      icon: WeatherIcon,
      color: 'weather',
      functions: ['气象预测 / Weather Forecasting', '预警发布 / Alert Issuance', '影响评估 / Impact Assessment', '应急响应 / Emergency Response'],
      description: '实时监测天气变化，预测极端天气，发布预警信息。Real-time weather monitoring, extreme weather prediction, and alert information dissemination.',
      details: '整合多源气象数据，提供精准的天气预报，及时发布恶劣天气预警，协助其他智能体制定应对策略。Integrates multi-source meteorological data, provides accurate weather forecasts, issues severe weather warnings promptly, and assists other agents in developing response strategies.',
      position: { angle: 60, radius: 250 } // 2点钟方向
    },
    {
      id: 'parking-manager',
      name: 'Parking Manager',
      role: '停车管理子智能体',
      icon: ParkingIcon,
      color: 'parking',
      functions: ['车位监测 / Parking Space Monitoring', '智能引导 / Smart Guidance', '费用管理 / Fee Management', '违规处理 / Violation Handling'],
      description: '智能停车管理，实时监测车位状态，提供停车引导服务。Intelligent parking management, real-time parking space monitoring, and parking guidance services.',
      details: '通过物联网传感器监测停车位使用情况，为驾驶员提供实时停车位信息和导航服务，优化停车资源利用。Monitors parking space usage through IoT sensors, provides real-time parking information and navigation services to drivers, and optimizes parking resource utilization.',
      position: { angle: 90, radius: 250 } // 3点钟方向
    },
    {
      id: 'safety-monitor',
      name: 'Safety Monitor',
      role: '安全监测子智能体',
      icon: SafetyIcon,
      color: 'safety',
      functions: ['安全监控 / Safety Monitoring', '风险评估 / Risk Assessment', '应急响应 / Emergency Response', '预防措施 / Preventive Measures'],
      description: '全方位安全监控，识别潜在风险，及时响应安全事件。Comprehensive safety monitoring, identifying potential risks, and responding promptly to safety incidents.',
      details: '通过视频监控、传感器网络等技术手段，实时监测城市安全状况，识别异常行为，快速响应安全事件。Monitors urban safety conditions in real-time through video surveillance and sensor networks, identifies abnormal behavior, and responds quickly to safety incidents.',
      position: { angle: 120, radius: 250 } // 4点钟方向
    },
    {
      id: 'ems-agent',
      name: 'Emergency Services',
      role: '紧急服务子智能体',
      icon: EMSIcon,
      color: 'ems',
      functions: ['急救调度 / Emergency Dispatch', '资源调配 / Resource Allocation', '路径优化 / Route Optimization', '协调指挥 / Coordination Command'],
      description: '紧急医疗服务管理，快速响应医疗急救需求。Emergency medical service management, rapid response to medical emergency needs.',
      details: '整合医疗资源，优化急救车辆调度，为紧急医疗事件提供快速响应和高效服务。Integrates medical resources, optimizes emergency vehicle dispatch, and provides rapid response and efficient services for emergency medical events.',
      position: { angle: 150, radius: 250 } // 5点钟方向
    },
    {
      id: 'enforcement-agent',
      name: 'Law Enforcement',
      role: '执法管理子智能体',
      icon: EnforcementIcon,
      color: 'enforcement',
      functions: ['违法监测 / Violation Monitoring', '执法调度 / Law Enforcement Dispatch', '证据收集 / Evidence Collection', '案件处理 / Case Handling'],
      description: '智能执法管理，监测违法行为，协调执法资源。Intelligent law enforcement management, monitoring violations, and coordinating enforcement resources.',
      details: '通过AI视觉识别技术监测交通违法行为，自动调度执法资源，提高执法效率和准确性。Monitors traffic violations through AI visual recognition technology, automatically dispatches enforcement resources, and improves enforcement efficiency and accuracy.',
      position: { angle: 180, radius: 250 } // 6点钟方向
    },
    {
      id: 'sanitation-agent',
      name: 'Sanitation Manager',
      role: '环卫管理子智能体',
      icon: SanitationIcon,
      color: 'sanitation',
      functions: ['垃圾监测 / Waste Monitoring', '清洁调度 / Cleaning Dispatch', '环境评估 / Environmental Assessment', '资源优化 / Resource Optimization'],
      description: '智能环卫管理，监测垃圾状况，优化清洁作业。Intelligent sanitation management, monitoring waste conditions, and optimizing cleaning operations.',
      details: '通过传感器监测垃圾桶状态，智能调度清洁车辆，优化环卫作业路线，保持城市环境整洁。Monitors trash bin status through sensors, intelligently dispatches cleaning vehicles, optimizes sanitation routes, and maintains clean urban environment.',
      position: { angle: 210, radius: 250 } // 7点钟方向
    },
    {
      id: 'sprinkler-agent',
      name: 'Irrigation Manager',
      role: '灌溉管理子智能体',
      icon: SprinklerIcon,
      color: 'sprinkler',
      functions: ['土壤监测 / Soil Monitoring', '智能灌溉 / Smart Irrigation', '节水优化 / Water Conservation', '植物养护 / Plant Care'],
      description: '智能灌溉系统，监测土壤湿度，优化水资源利用。Intelligent irrigation system, monitoring soil moisture, and optimizing water resource utilization.',
      details: '通过土壤湿度传感器和气象数据，智能控制灌溉系统，实现精准灌溉，节约水资源，促进植物健康生长。Controls irrigation systems intelligently through soil moisture sensors and meteorological data, achieving precise irrigation, conserving water resources, and promoting healthy plant growth.',
      position: { angle: 240, radius: 250 } // 8点钟方向
    },
    {
      id: 'perception-agent',
      name: 'Perception Agent',
      role: '感知子智能体',
      icon: PerceptionIcon,
      color: 'perception',
      functions: ['环境感知 / Environmental Perception', '目标识别 / Object Recognition', '状态监测 / Status Monitoring', '数据分析 / Data Analysis'],
      description: '智能环境感知，识别和分析城市环境中的各种目标。Intelligent environmental perception, identifying and analyzing various targets in urban environments.',
      details: '通过计算机视觉和传感器融合技术，实时感知城市环境，识别行人、车辆、障碍物等目标，为其他智能体提供准确的环境信息。Perceives urban environment in real-time through computer vision and sensor fusion technology, identifies pedestrians, vehicles, obstacles, and other targets, providing accurate environmental information to other agents.',
      position: { angle: 270, radius: 250 } // 9点钟方向
    },
    {
      id: 'traffic-incident-agent',
      name: 'Traffic Incident Agent',
      role: '交通事件子智能体',
      icon: TrafficIncidentIcon,
      color: 'traffic-incident',
      functions: ['事件检测 / Incident Detection', '影响评估 / Impact Assessment', '应急响应 / Emergency Response', '信息发布 / Information Dissemination'],
      description: '智能交通事件管理，快速检测和处理交通事件。Intelligent traffic incident management, rapid detection and handling of traffic incidents.',
      details: '通过AI算法实时监测交通状况，自动检测交通事故、道路施工等事件，评估影响范围，协调应急响应，及时发布交通信息。Monitors traffic conditions in real-time through AI algorithms, automatically detects traffic accidents, road construction, and other incidents, assesses impact scope, coordinates emergency response, and disseminates traffic information promptly.',
      position: { angle: 300, radius: 250 } // 10点钟方向
    },
    {
      id: 'reroute-agent',
      name: 'Reroute Agent',
      role: '路径重规划子智能体',
      icon: RerouteIcon,
      color: 'reroute',
      functions: ['路径规划 / Route Planning', '动态调整 / Dynamic Adjustment', '拥堵规避 / Congestion Avoidance', '最优路径 / Optimal Routes'],
      description: '智能路径重规划，根据实时交通状况动态调整行驶路线。Intelligent route replanning, dynamically adjusting driving routes based on real-time traffic conditions.',
      details: '基于实时交通数据和历史模式，为车辆提供最优路径规划，动态调整路线以避开拥堵，提高交通效率。Provides optimal route planning for vehicles based on real-time traffic data and historical patterns, dynamically adjusts routes to avoid congestion, and improves traffic efficiency.',
      position: { angle: 330, radius: 250 } // 11点钟方向
    }
  ];

  return (
    <div className="integrated-system-container">
      {/* 系统状态指示器 */}
      <div className="system-status-bar">
        <div className="status-indicator-item">
          <div className="status-dot active"></div>
          <span>{t.systemStatus.running}</span>
        </div>
        <div className="status-indicator-item">
          <div className="status-dot processing"></div>
          <span>{t.systemStatus.collaborating}</span>
      </div>
        <div className="status-indicator-item">
          <div className="status-dot ready"></div>
          <span>{t.systemStatus.ready}</span>
                  </div>
        <div className="language-switcher-container">
          <LanguageSwitcher />
              </div>
            </div>
            
      <div className="main-layout-grid">
        {/* 左侧：任务规划区域 */}
        <div className="task-planning-section">
          <div className="section-header">
            <h2 className="section-title">📋 {t.sections.taskPlanning}</h2>
            <div className="section-subtitle">{t.sections.taskSubtitle}</div>
                </div>
          
          <div className="task-control-panel">
            <div className="task-input-area">
              <h3 className="task-input-title">{t.taskPlanning.inputTitle}</h3>
              <textarea
                className="task-input-field"
                placeholder={t.taskPlanning.placeholder}
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                rows="4"
              />
              <div className="task-examples">
                <h4>{t.taskPlanning.examples}</h4>
                <div className="example-buttons">
                  <button className="example-btn" onClick={() => setSendMessage(t.taskPlanning.example1)}>
                    {t.taskPlanning.example1}
                  </button>
                  <button className="example-btn" onClick={() => setSendMessage(t.taskPlanning.example2)}>
                    {t.taskPlanning.example2}
                  </button>
                  <button className="example-btn" onClick={() => setSendMessage(t.taskPlanning.example3)}>
                    {t.taskPlanning.example3}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="agent-selection-area">
              <h3 className="agent-selection-title">{t.taskPlanning.agentSelection}</h3>
              <div className="agent-selection-grid">
                {agents.map(agent => (
                  <div 
                    key={agent.id}
                    className={`agent-selection-card ${selectedAgents.some(a => a.id === agent.id) ? 'selected' : ''}`}
                    onClick={() => toggleAgentSelection(agent)}
                  >
                    <div className={`agent-selection-icon ${agent.color}-icon`}>
                      {React.createElement(agent.icon)}
                    </div>
                    <div className="agent-selection-name">{agent.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="task-execution-controls">
              <button 
                className="execute-task-btn"
                onClick={startMultiAgentCollaboration}
                disabled={selectedAgents.length < 2 || !sendMessage.trim()}
              >
                {t.taskPlanning.executeTask}
              </button>
            </div>
          </div>
        </div>

        {/* 中间：智能体架构和场景执行 */}
        <div className="agent-architecture-section">
          <div className="section-header">
            <h2 className="section-title">🏗️ {t.sections.agentArchitecture}</h2>
            <div className="section-subtitle">{t.sections.subtitle}</div>
          </div>
          
          <div className="slot-machine-container">
        <div className="slot-machine-layout">
          <div 
            className="slot-machine-wheel"
          >
          {/* Master Agent - Center */}
          <div className="master-agent-center">
            <div className="master-agent-card">
              <div className="master-icon-container">
                <div className="master-icon">
                    <div className="crown-emoji">👑</div>
                </div>
                <div className="master-glow"></div>
              </div>
              <div className="master-info">
                <h3 className="master-name">{t.agents.master}</h3>
                <p className="master-role">{t.roles.master}</p>
                <div className="interaction-indicator">
                  <div className="pulse-dot"></div>
                  <span>Active Coordination</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Circular Sub Agents */}
          {agents.map((agent, index) => {
            const angle = agent.position.angle;
            const radius = agent.position.radius;
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div 
                  key={agent.id} 
                  className={`sub-agent ${agent.color}-agent circular-agent ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) ${(isMultiAgentMode ? selectedAgents.some(a => a.id === agent.id) : selectedAgent?.id === agent.id) ? 'scale(1.1)' : ''}`,
                    zIndex: (isMultiAgentMode ? selectedAgents.some(a => a.id === agent.id) : selectedAgent?.id === agent.id) ? 1000 : 1,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div className="sub-agent-card" onClick={() => toggleAgentSelection(agent)}>
                <div className="agent-icon-container">
                      <div className={`agent-icon ${agent.color}-icon`}>
                        {React.createElement(agent.icon)}
                  </div>
                  <div className="status-indicator active"></div>
                </div>
                <div className="agent-content">
                      <h4 className="agent-name">{agent.name}</h4>
                      <p className="agent-role">{agent.role}</p>
                      <div className="agent-actions">
                        <button 
                          className="send-button"
                          onClick={(e) => openSendInterface(agent, e)}
                          title="发送消息给此智能体"
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="send-icon">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          发送
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection Line to Master */}
                  <div 
                    className="connection-line"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: `${Math.sqrt(x*x + y*y)}px`,
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(0, 122, 255, 0.3), rgba(0, 122, 255, 0.3))',
                      transformOrigin: '0 0',
                      transform: `rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`,
                      zIndex: 1,
                      opacity: (isMultiAgentMode ? selectedAgents.some(a => a.id === agent.id) : selectedAgent?.id === agent.id) ? 1 : 0.5,
                      transition: 'opacity 0.3s ease'
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* 右侧：执行报告和结果分析 */}
          <div className="execution-report-section">
            <div className="section-header">
              <h2 className="section-title">📊 {t.sections.executionReport}</h2>
              <div className="section-subtitle">{t.sections.reportSubtitle}</div>
            </div>
            
            <div className="report-dashboard">
              <div className="report-summary">
                <h3 className="report-title">{t.report.summary}</h3>
                <div className="summary-stats">
                  <div className="stat-item">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                      <div className="stat-number">{interactionHistory.length}</div>
                      <div className="stat-label">{t.report.completedTasks}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">⚡</div>
                    <div className="stat-info">
                      <div className="stat-number">{selectedAgents.length}</div>
                      <div className="stat-label">{t.report.activeAgents}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                      <div className="stat-number">98.5%</div>
                      <div className="stat-label">{t.report.successRate}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="report-details">
                <h3 className="report-title">{t.report.details}</h3>
                <div className="report-content">
                  {interactionHistory.length > 0 ? (
                    <div className="interaction-timeline">
                      {interactionHistory.map((interaction, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">
                            <div className="timeline-icon">
                              {interaction.type === 'master' ? '👑' : '🤖'}
                            </div>
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <span className="timeline-agent">{interaction.agent}</span>
                              <span className="timeline-time">{interaction.timestamp}</span>
                            </div>
                            <div className="timeline-message">{interaction.message}</div>
                            {interaction.dsl && (
                              <div className="timeline-dsl">
                                <div className="dsl-label">DSL原语:</div>
                                <div className="dsl-content">{interaction.dsl}</div>
                              </div>
                            )}
                            {interaction.apiCall && (
                              <div className="timeline-api">
                                <div className="api-label">API调用:</div>
                                <div className="api-content">{interaction.apiCall}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-report">
                      <div className="empty-icon">📋</div>
                      <h4>{t.report.emptyTitle}</h4>
                      <p>{t.report.emptyMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
              <div className="function-display-card">
                <div className="function-display-header">
                  <h3 className="function-display-title">
                    {isMultiAgentMode 
                      ? `${t.functionControl.multiAgentTitle} (${selectedAgents.length})` 
                      : selectedAgent 
                        ? `${selectedAgent.name} - ${t.functionControl.title}` 
                        : t.functionControl.title
                    }
                  </h3>
                <div className="header-controls">
                  <button 
                    className={`mode-toggle-btn ${isMultiAgentMode ? 'active' : ''}`}
                    onClick={() => {
                      setIsMultiAgentMode(!isMultiAgentMode);
                      if (!isMultiAgentMode) {
                        setSelectedAgents([]);
                      } else {
                        setSelectedAgent(null);
                      }
                    }}
                    title={isMultiAgentMode ? '切换到单智能体模式' : t.functionControl.modeToggleTooltip}
                  >
                    {t.functionControl.modeToggle}
                  </button>
                  {(selectedAgent || selectedAgents.length > 0) && (
                    <button 
                      className="close-selection-btn"
                      onClick={() => {
                        setSelectedAgent(null);
                        setSelectedAgents([]);
                      }}
                      title="取消选择"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              <div className="function-display-content">
                {isMultiAgentMode ? (
                  <div className="multi-agent-functions">
                    {selectedAgents.length > 0 ? (
                      <div>
                        <div className="selected-agents-list">
                          <h4>{t.functionControl.selectedAgents}</h4>
                          <div className="agents-grid">
                            {selectedAgents.map(agent => (
                              <div key={agent.id} className="selected-agent-item">
                                <div className={`agent-mini-icon ${agent.color}-icon`}>
                                  {React.createElement(agent.icon)}
                                </div>
                                <span className="agent-mini-name">{agent.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="collaboration-controls">
                          <button 
                            className="collaboration-btn"
                            onClick={startMultiAgentCollaboration}
                            disabled={selectedAgents.length < 2}
                          >
                            {selectedAgents.length < 2 ? t.messages.selectAgent : t.functionControl.startCollaboration}
                          </button>
                          
                          <div className="collaboration-info">
                            <div className="info-item">
                              <span className="info-label">协作模式：</span>
                              <span className="info-value">自动任务分配</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">处理方式：</span>
                              <span className="info-value">并行协作</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">响应时间：</span>
                              <span className="info-value">3-5秒</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="multi-agent-guide">
                        <div className="guide-icon">
                          <svg viewBox="0 0 24 24" fill="none" className="guide-svg-icon">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <h4>多智能体协作模式</h4>
                        <p>选择多个智能体进行协作任务</p>
                        <p>点击智能体卡片进行多选</p>
                        <p>至少选择2个智能体开始协作</p>
                        <p>系统将自动分配任务并协调处理</p>
                      </div>
                    )}
                  </div>
                ) : selectedAgent ? (
                  <div className="agent-functions">
                    <p className="agent-description">{selectedAgent.description}</p>
                    <div className="function-list">
                      {selectedAgent.functions.map((func, index) => (
                        <span key={index} className="function-tag">
                          {func}
                        </span>
                      ))}
                    </div>
                    <div className="agent-details">
                      <h4>详细功能</h4>
                      <p>{selectedAgent.details}</p>
                    </div>
                  </div>
                ) : (
                  <div className="default-message">
                    <div className="default-icon">
                      <svg viewBox="0 0 24 24" fill="none" className="default-svg-icon">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p>点击智能体查看其功能</p>
                    <p>Click agents to view their functions</p>
                    <p>点击发送按钮与智能体交互</p>
                    <p>Click send button to interact with agents</p>
                  </div>
                )}
              </div>
            </div>
                </div>
              </div>
            </div>
            
      {/* Interaction History */}
      {interactionHistory.length > 0 && (
        <div className="interaction-history">
          <div className="history-header">
            <h3>交互记录 / Interaction History</h3>
            <button 
              className="clear-history-btn"
              onClick={() => setInteractionHistory([])}
            >
              清空记录
            </button>
          </div>
          <div className="history-content">
            {interactionHistory.map(interaction => (
              <div key={interaction.id} className={`history-item ${interaction.type}`}>
                <div className="history-header-item">
                  <div className="history-agents">
                    {interaction.agents.map(agent => (
                      <div key={agent.id} className="history-agent-tag">
                        <div className={`history-agent-icon ${agent.color}-icon`}>
                          {React.createElement(agent.icon)}
                        </div>
                        <span>{agent.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="history-timestamp">{interaction.timestamp}</div>
                </div>
                <div className="history-message">{interaction.message}</div>
                {interaction.response && (
                  <div className="history-response">
                    <div className="response-summary">{interaction.response.summary}</div>
                    <div className="response-details">
                      {interaction.response.details.map((detail, idx) => (
                        <div key={idx} className="response-detail-item">{detail}</div>
                      ))}
                    </div>
                    {interaction.response.apiCall && (
                      <div className="api-call-info">
                        <div className="api-call-label">API调用：</div>
                        <div className="api-call-code">{interaction.response.apiCall}</div>
                      </div>
                    )}
                    <div className="response-result">{interaction.response.result}</div>
                    
                    {/* Multi-Agent DSL Framework 展示 */}
                    {interaction.dsl && (
                      <div className="dsl-section">
                        <div className="dsl-header">
                          <span className="dsl-icon">🚀</span>
                          <span className="dsl-title">Multi-Agent DSL Framework</span>
                          <span className="dsl-phase">{interaction.phase}</span>
                        </div>
                        <div className="dsl-content">
                          {interaction.type === 'workflow_step' && (
                            <div className="dsl-workflow">
                              <div className="dsl-primitive">
                                <div className="primitive-header">
                                  <span className="primitive-name">{interaction.dsl.primitive}</span>
                                  <span className="primitive-type">DSL原语</span>
                                </div>
                                <div className="primitive-description">{interaction.dsl.description}</div>
                                <div className="primitive-syntax">
                                  <span className="syntax-label">语法:</span>
                                  <code className="syntax-code">{interaction.dsl.syntax}</code>
                                </div>
                                <div className="primitive-example">
                                  <span className="example-label">示例:</span>
                                  <code className="example-code">{interaction.dsl.example}</code>
                                </div>
                              </div>
                              <div className="workflow-phase">
                                <div className="phase-info">
                                  <span className="phase-label">工作流阶段:</span>
                                  <span className="phase-value">{interaction.phase}</span>
                                </div>
                                <div className="phase-description">{interaction.description}</div>
                              </div>
                            </div>
                          )}
                          {interaction.type === 'master_coordination' && (
                            <div className="dsl-master">
                              <div className="dsl-step">
                                <span className="step-number">1</span>
                                <span className="step-text">任务分析：{interaction.dsl.taskAnalysis.complexity} 复杂度，{interaction.dsl.taskAnalysis.priority} 优先级</span>
                              </div>
                              <div className="dsl-step">
                                <span className="step-number">2</span>
                                <span className="step-text">策略制定：{interaction.dsl.strategy.executionOrder.join(' → ')} 执行顺序</span>
                              </div>
                              <div className="dsl-step">
                                <span className="step-number">3</span>
                                <span className="step-text">任务分解：{interaction.dsl.decomposedTasks.length} 个子任务已分发</span>
                              </div>
                            </div>
                          )}
                          {interaction.type === 'sub_agent_task' && (
                            <div className="dsl-sub">
                              <div className="dsl-task-info">
                                <span className="task-id">任务ID: {interaction.dsl.taskId}</span>
                                <span className="agent-type">智能体: {interaction.dsl.agentType}</span>
                              </div>
                              <div className="dsl-parameters">
                                <span className="param-label">参数:</span>
                                <span className="param-value">{JSON.stringify(interaction.dsl.parameters)}</span>
                              </div>
                              <div className="dsl-output">
                                <span className="output-label">期望输出:</span>
                                <span className="output-value">{interaction.dsl.output}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className={`history-status ${interaction.status}`}>
                  {interaction.status === 'processing' ? '处理中...' : 
                   interaction.status === 'completed' ? '已完成' : 
                   interaction.status === 'active' ? '活跃' : interaction.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Send Message Modal */}
      {activeSendAgent && (
        <div className="send-modal-overlay" onClick={closeSendInterface}>
          <div className="send-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="send-modal-close" onClick={closeSendInterface}>×</button>
            <div className="send-modal-header">
              <div className={`send-modal-icon ${activeSendAgent.color}-icon`}>
                {React.createElement(activeSendAgent.icon)}
              </div>
              <div className="send-modal-info">
                <h3 className="send-modal-title">{t.functionControl.sendMessage} {activeSendAgent.name}</h3>
                <p className="send-modal-subtitle">{activeSendAgent.role}</p>
              </div>
            </div>
            <div className="send-modal-body">
              <div className="send-modal-section">
                <h4>消息内容</h4>
                <textarea
                  className="send-message-input"
                  placeholder={`请输入要发送给${activeSendAgent.name}的消息...`}
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="send-modal-section">
                <h4>预设消息</h4>
                <div className="preset-messages">
                  {activeSendAgent.functions.map((func, idx) => (
                    <button
                      key={idx}
                      className="preset-message-btn"
                      onClick={() => setSendMessage(`请执行${func}功能`)}
                    >
                      {func}
                    </button>
                  ))}
                </div>
              </div>
              <div className="send-modal-actions">
                <button className="send-cancel-btn" onClick={closeSendInterface}>
                  取消
                </button>
                <button 
                  className="send-confirm-btn" 
                  onClick={handleSendMessage}
                  disabled={!sendMessage.trim()}
                >
                  {t.buttons.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentArchitecture;