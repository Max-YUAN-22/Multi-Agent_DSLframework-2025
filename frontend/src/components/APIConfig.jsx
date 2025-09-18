import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Alert,
  Chip,
  Box,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Error,
  Refresh,
  Save,
  Clear
} from '@mui/icons-material';
import axios from 'axios';
import './APIConfig.css';

const APIConfig = () => {
  const [apiKeys, setApiKeys] = useState({
    deepseek_api_key: '',
    openai_api_key: '',
    openweather_api_key: '',
    google_maps_api_key: '',
    alpha_vantage_api_key: ''
  });
  
  const [showKeys, setShowKeys] = useState({
    deepseek: false,
    openai: false,
    openweather: false,
    google_maps: false,
    alpha_vantage: false
  });
  
  const [status, setStatus] = useState({
    message: '',
    type: 'info'
  });
  
  const [availableServices, setAvailableServices] = useState([]);
  const [validationResults, setValidationResults] = useState({});
  const [loading, setLoading] = useState(false);

  const apiKeyLabels = {
    deepseek_api_key: 'DeepSeek API Key',
    openai_api_key: 'OpenAI API Key',
    openweather_api_key: 'OpenWeather API Key',
    google_maps_api_key: 'Google Maps API Key',
    alpha_vantage_api_key: 'Alpha Vantage API Key'
  };

  const apiKeyDescriptions = {
    deepseek_api_key: '用于智能对话和文本生成',
    openai_api_key: '用于GPT模型调用',
    openweather_api_key: '用于天气数据获取',
    google_maps_api_key: '用于地图和位置服务',
    alpha_vantage_api_key: '用于金融数据获取'
  };

  const apiKeyPlaceholders = {
    deepseek_api_key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    openai_api_key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    openweather_api_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    google_maps_api_key: 'AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    alpha_vantage_api_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  };

  useEffect(() => {
    fetchAPIStatus();
  }, []);

  const fetchAPIStatus = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
      const response = await axios.get(`${backendUrl}/api/api-keys/status`);
      setAvailableServices(response.data.available_services);
    } catch (error) {
      console.error('获取API状态失败:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleKeyVisibility = (key) => {
    setShowKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
      const response = await axios.post(`${backendUrl}/api/api-keys/configure`, apiKeys);
      setStatus({
        message: response.data.message,
        type: 'success'
      });
      await fetchAPIStatus();
    } catch (error) {
      setStatus({
        message: `保存失败: ${error.response?.data?.detail || error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
      const response = await axios.post(`${backendUrl}/api/api-keys/validate`);
      setValidationResults(response.data.validation_results);
      setStatus({
        message: 'API密钥验证完成',
        type: 'info'
      });
    } catch (error) {
      setStatus({
        message: `验证失败: ${error.response?.data?.detail || error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm('确定要清除所有API密钥吗？')) {
      setLoading(true);
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
        await axios.delete(`${backendUrl}/api/api-keys/clear`);
        setApiKeys({
          deepseek_api_key: '',
          openai_api_key: '',
          openweather_api_key: '',
          google_maps_api_key: '',
          alpha_vantage_api_key: ''
        });
        setStatus({
          message: '所有API密钥已清除',
          type: 'success'
        });
        await fetchAPIStatus();
      } catch (error) {
        setStatus({
          message: `清除失败: ${error.response?.data?.detail || error.message}`,
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getValidationIcon = (service) => {
    const result = validationResults[service];
    if (!result) return null;
    
    return result.status === 'valid' ? 
      <CheckCircle color="success" fontSize="small" /> : 
      <Error color="error" fontSize="small" />;
  };

  return (
    <div className="api-config-container">
      <Card className="api-config-card">
        <CardHeader>
          <Typography variant="h5" component="h2" className="api-config-title">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" component="h2">
                API 密钥配置
              </Typography>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleValidate}
                  disabled={loading}
                >
                  验证
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  保存配置
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Clear />}
                  onClick={handleClear}
                  disabled={loading}
                >
                  清除
                </Button>
              </Box>
            </Box>
          </Typography>
        </CardHeader>
        
        <CardContent>
          {status.message && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}

          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              已配置的服务
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {availableServices.map(service => (
                <Chip
                  key={service}
                  label={service}
                  color="primary"
                  variant="outlined"
                />
              ))}
              {availableServices.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  暂无配置的服务
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            API 密钥设置
          </Typography>
          
          {Object.entries(apiKeys).map(([key, value]) => (
            <Box key={key} mb={2}>
              <TextField
                fullWidth
                label={apiKeyLabels[key]}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                type={showKeys[key] ? 'text' : 'password'}
                placeholder={apiKeyPlaceholders[key]}
                helperText={apiKeyDescriptions[key]}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={showKeys[key] ? '隐藏密钥' : '显示密钥'}>
                      <IconButton
                        onClick={() => toggleKeyVisibility(key)}
                        edge="end"
                      >
                        {showKeys[key] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  )
                }}
              />
              {validationResults[key] && (
                <Box display="flex" alignItems="center" mt={1}>
                  {getValidationIcon(key)}
                  <Typography variant="body2" ml={1}>
                    {validationResults[key].message}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              💡 提示：配置API密钥后，系统将使用真实的服务进行智能体交互。
              如果不配置，系统将使用模拟响应进行演示。
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIConfig;