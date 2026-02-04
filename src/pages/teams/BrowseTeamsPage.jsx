import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaUsers, FaCode } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { teamAPI } from '../../api/teams'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import TeamCard from '../../components/team/TeamCard'
import Sidebar from '../../components/layout/Sidebar'

export default function BrowseTeamsPage() {
  const [teams, setTeams] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { myTeam } = useSelector((state) => state.team)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    loadTeams()
  }, [])

  useEffect(() => {
    filterTeams()
  }, [searchQuery, selectedLanguage, teams])

  const loadTeams = async () => {
    try {
      setIsLoading(true)
      const response = await teamAPI.getAllTeams()
      const allTeams = response.teams || []
      
      const availableTeams = allTeams.filter(team => 
        !team.isLocked && 
        team.memberCount < team.maxMembers &&
        team._id !== myTeam?._id
      )
      
      setTeams(availableTeams)
      setFilteredTeams(availableTeams)
    } catch (error) {
      console.error('Failed to load teams:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTeams = () => {
    let filtered = teams

    if (searchQuery) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.projectIdea?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLanguage) {
      filtered = filtered.filter(team => team.language === selectedLanguage)
    }

    setFilteredTeams(filtered)
  }

  const getLanguages = () => {
    const languages = new Set()
    teams.forEach(team => {
      if (team.language) {
        languages.add(team.language)
      }
    })
    return Array.from(languages)
  }

  const handleJoinRequest = (team) => {
    console.log('Join request for team:', team.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="section-padding py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Browse Teams</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect team to join and build amazing projects together
              </p>
            </div>

            <Card className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search teams by name, description, or project idea..."
                    leftIcon={<FaSearch className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Languages</option>
                    {getLanguages().map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredTeams.length} teams available
                    </span>
                  </div>
                  {selectedLanguage && (
                    <div className="flex items-center space-x-2">
                      <FaCode className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Language: {selectedLanguage}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  onClick={loadTeams}
                  loading={isLoading}
                >
                  <FaFilter className="mr-2" />
                  Refresh
                </Button>
              </div>
            </Card>

            {isLoading ? (
              <Card>
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading teams...</p>
                </div>
              </Card>
            ) : filteredTeams.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">No Teams Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {searchQuery || selectedLanguage
                      ? 'No teams match your search criteria. Try adjusting your filters.'
                      : 'All teams are currently full or locked. Try creating your own team!'}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTeams.map((team) => (
                  <TeamCard
                    key={team._id}
                    team={team}
                    currentUserTeamId={myTeam?._id}
                    onJoinRequest={handleJoinRequest}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}