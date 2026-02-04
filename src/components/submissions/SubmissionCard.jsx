import { FaExternalLinkAlt, FaGithub, FaVideo, FaMapMarkerAlt } from 'react-icons/fa'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

export default function SubmissionCard({ submission, showTeam = true, onClick }) {
  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold">{submission.projectName}</h3>
              {submission.isLocked && (
                <Badge variant="success" size="sm">Submitted</Badge>
              )}
            </div>
            {showTeam && submission.team && (
              <Badge variant="primary" size="sm">
                {submission.team.name}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {submission.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {submission.techStack?.map((tech, index) => (
              <Badge key={index} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submission.demoLink && (
              <div className="flex items-center space-x-2 text-sm">
                <FaExternalLinkAlt className="w-4 h-4 text-blue-500" />
                <a
                  href={submission.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>
              </div>
            )}
            
            {submission.githubLink && (
              <div className="flex items-center space-x-2 text-sm">
                <FaGithub className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <a
                  href={submission.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Source Code
                </a>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm">
              <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {submission.pitchLocation}
              </span>
            </div>
            
            {submission.submissionVideo && (
              <div className="flex items-center space-x-2 text-sm">
                <FaVideo className="w-4 h-4 text-red-500" />
                <a
                  href={submission.submissionVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 dark:text-red-400 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Video Pitch
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}