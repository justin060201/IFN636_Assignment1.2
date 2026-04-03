import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const ProjectDetails = () => {
  const { projectId } = useParams(); // 從 URL 取得專案 ID
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false); // 控制刪除成功畫面
  const [isLoading, setIsLoading] = useState(true);

  // 讀取 (Read) 專案資料
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("無法載入專案資料:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  // 刪除 (Delete) 專案
  const handleDelete = async () => {
    const confirmDelete = window.confirm("確定要刪除這個專案嗎？");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/projects/${projectId}`);
      setIsDeleted(true); // 切換到刪除成功畫面
    } catch (error) {
      console.error("刪除失敗:", error);
      alert("刪除失敗，請檢查權限或稍後再試。");
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (!project && !isDeleted) return <div className="p-6 text-center">找不到專案</div>;

  // ----- 條件渲染：刪除成功畫面 (Figma 第4張圖) -----
  if (isDeleted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-64 h-64 bg-red-200 rounded-full flex flex-col items-center justify-center mb-10 shadow-lg text-center p-6">
          <p className="text-xl font-bold text-black">Your post has been</p>
          <p className="text-xl font-bold text-black">deleted successfully!</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="w-3/4 py-3 bg-[#8b8058] text-white rounded-lg font-semibold"
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  // ----- 預設渲染：專案詳情畫面 (Figma 第3張圖) -----
  return (
    <div className="p-6 h-screen bg-gray-50 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="text-xl">←</button>
        <h1 className="text-xl font-bold">Project Details</h1>
        <div className="w-6"></div> {/* 排版佔位用 */}
      </div>

      {/* 專案圖片/卡片 */}
      <div className="bg-gray-200 rounded-xl h-40 mb-4 relative flex items-center p-4">
         <div className="bg-white p-2 rounded shadow-sm w-1/2">
            <h3 className="font-bold text-sm truncate">{project.title || "Create an Application"}</h3>
            <p className="text-xs text-gray-500">Tony Jones</p>
         </div>
         {/* 刪除按鈕 (Figma 中紅色小按鈕) */}
         <button 
           onClick={handleDelete}
           className="absolute bottom-2 right-2 bg-red-400 text-white text-xs px-3 py-1 rounded"
         >
           Delete
         </button>
      </div>

      <p className="text-xs text-gray-500 mb-1">Posted 3 days ago</p>
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        {project.description || project.message}
      </p>

      <div className="flex justify-between items-center border-t border-gray-300 pt-4 mb-4">
        <div>
          <h3 className="font-bold text-lg">Notification</h3>
          <p className="text-sm text-gray-600">Deadline: {project.deadline || "17/10/2026"}</p>
        </div>
        <p className="text-red-400 font-bold">$ {project.budget || "3500"}</p>
      </div>

      <p className="text-sm text-gray-600 pb-20">
         Focus on Innovation: They want to "push the boundaries..."
      </p>

      {/* 底部導覽列保留空間 (視你的專案 Navbar 設計而定) */}
    </div>
  );
};

export default ProjectDetails;