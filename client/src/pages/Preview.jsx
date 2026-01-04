import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon, Loader } from 'lucide-react';

// Redux
import api from '../configs/api';

const Preview = () => {

  // getting resumeId from url params
  const {resumeId} = useParams();

  const [isLoading, setIsLoading] = useState(true);

  // state to hold resume data
  const [resumeData, setResumeData] = useState(null);

  // setting resume data based on resumeId
  const loadResumeData = async () => {
     try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // load resume data on Component mount
  useEffect(()=>{
    loadResumeData();
  }, []);

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white'/>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      {isLoading ? <Loader /> : (
        <div>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
            <a href="/" className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors">
              <ArrowLeftIcon className="mr-2 size-4"/> 
            </a>
        </div>
      )}
    </div>
  )
}

export default Preview