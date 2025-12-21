import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {

    // handleChange when image 
    const handleChange = (field, value) => {
        onChange({...data, [field]: value})
    }

    // fields : stored fields as an object in array here
    const fields = [
        { key: "full_name", label: 'Full Name', icons: User, type: "text", required: true },
        { key: "email", label: 'Email Address', icons: Mail, type: "email", required: true },
        { key: "phone", label: 'Phone Number', icons: Phone, type: "tel" },
        { key: "location", label: 'Location', icons: MapPin, type: "text" },
        { key: "profession", label: 'Profession', icons: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: 'LinkedIn Profile', icons: Linkedin, type: "url" },
        { key: "website", label: 'Personal Website', icons: Globe, type: "url" },
    ]

  return (
    <div>
        {/* Heading */}
        <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>

        {/* para */}
        <p className='text-sm text-gray-600'>Get Started with the personal</p>

        {/* Image */}
        <div className='flex items-center gap-2'>
            <label>
                {data.image ? (
                    <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'/>
                ): (
                    <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                        <User className='size-10 p-2.5 border rounded-full' />
                        Upload user image
                    </div>
                )}
                <input type="file" accept="image/jpeg, image/png" className ='hidden' onChange={(e)=> handleChange("image", e.target.files[0])} />
            </label>

            {typeof data.image === 'object' && (
                <div className='flex flex-col gap-1 p-4 text-sm'>
                    <p>Remove Background</p>
                    <label className='relative inline-flex items-center cursor-pointer'>
                        <input type="checkbox" className="sr-only peer" onChange={()=> setRemoveBackground(prev => !prev)} checked={removeBackground}/>

                        <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'>
                        </div>

                        <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                    </label>
                </div>
            )}
            
        </div>

        {/* Fields */}
        {fields.map((field)=>{
            const Icon = field.icons;
            return (
                <div key={field.key} className='space-y-1 mt-5'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                        <Icon className="size-4"/>
                        {field.label}
                        {fields.required && <span className='text-red-500'></span>}
                    </label>
                    
                    <input type={field.type} value={data[field.key] || "" } onChange={(e)=>handleChange(field.key, e.target.value)} className='mt-1 w-full px-3 py-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colours text-sm' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required}/>

                </div>
            )
        })}
    </div>
  )
}

export default PersonalInfoForm
