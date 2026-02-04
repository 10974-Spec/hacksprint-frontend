import { useState } from 'react'
import SubmissionCard from '../submissions/SubmissionCard'
import ScoreForm from './ScoreForm'
import Modal from '../ui/Modal'

export default function SubmissionList({ submissions, onScoreSubmit }) {
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [isScoring, setIsScoring] = useState(false)

  const handleScoreSubmit = async (data) => {
    if (selectedSubmission) {
      await onScoreSubmit(selectedSubmission._id, data)
      setSelectedSubmission(null)
      setIsScoring(false)
    }
  }

  return (
    <div className="space-y-6">
      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            No submissions to judge yet
          </p>
        </div>
      ) : (
        submissions.map((submission) => (
          <SubmissionCard
            key={submission._id}
            submission={submission}
            showTeam
            onClick={() => {
              setSelectedSubmission(submission)
              setIsScoring(true)
            }}
          />
        ))
      )}

      <Modal
        isOpen={isScoring}
        onClose={() => {
          setIsScoring(false)
          setSelectedSubmission(null)
        }}
        title={`Score: ${selectedSubmission?.projectName}`}
        size="lg"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl">
              <h4 className="font-bold mb-2">Project Details</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedSubmission.description}
              </p>
            </div>
            
            <ScoreForm
              onSubmit={handleScoreSubmit}
              submission={selectedSubmission}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}