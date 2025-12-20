import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

  return (
    // outer main div wrapper
    <div className='space-y-4'>
        {/* inner div - (heading, para), button */}
        <div className='flex items-center justify-between'>
            {/* on right - division for header and paragraph*/}
            <div>
                <h3  className='flex items-center gap-2 text-lg font-semibold'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            {/* on left */}
            <button  className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                <Sparkles className='size-4' />
                AI Enhance
            </button>
        </div>

        {/* text area */}
        <div className="mt-6">
            <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} className='w-full p-3 px-4 mt-2 border text-sm bord focus:ring focus:ring-blue-500 focus:border-blue-5 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' />
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm