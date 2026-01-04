import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe
} from "lucide-react";

const FAANGPathTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 text-sm leading-relaxed">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {data.personal_info?.profession && (
          <p className="text-sm font-semibold text-gray-700 mt-1 text-center">
            {data.personal_info.profession}
          </p>
        )}

        {/* Contact Info – Center Start + Wrap */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3 text-gray-600 text-sm max-w-3xl mx-auto">
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Phone className="size-4" /> {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.email && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Mail className="size-4" /> {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin className="size-4" /> {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Linkedin className="size-4" /> {data.personal_info.linkedin}
            </span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Globe className="size-4" /> {data.personal_info.website}
            </span>
          )}
        </div>
      </header>

      <hr className="mb-6" style={{ borderColor: accentColor }} />

      {/* Profile Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="font-bold uppercase mb-2"
            style={{ color: accentColor }}
          >
            Profile Summary
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-bold uppercase mb-2"
            style={{ color: accentColor }}
          >
            Technical Skills
          </h2>
          <p className="text-gray-700">{data.skills.join(" | ")}</p>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-bold uppercase mb-3"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">
            {data.project.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.date && (
                    <span className="text-xs text-gray-500">{proj.date}</span>
                  )}
                </div>

                {proj.tech && (
                  <p className="italic text-xs text-gray-600 mb-1">
                    {proj.tech}
                  </p>
                )}

                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  {proj.description?.split("\n").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-bold uppercase mb-3"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {exp.position} – {exp.company}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-1">
                  {exp.description?.split("\n").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <h2
            className="font-bold uppercase mb-3"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `– ${edu.field}`}
                  </p>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FAANGPathTemplate;
