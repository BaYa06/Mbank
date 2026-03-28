import { ArrowLeft, Sparkles, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Determine title based on current path
    let title = "Анализ финансов"
    if (location.pathname === '/settings') title = "Настройки"
    else if (location.pathname === '/transactions') title = "Операции"
    else if (location.pathname === '/analytics') title = "Аналитика"
    else if (location.pathname === '/budget') title = "Бюджет"
    else if (location.pathname === '/ai-assistant') title = "ИИ Ассистент"

	const isFullScreen = ['/transactions', '/settings', '/ai-assistant'].includes(location.pathname)

	return (
		<header
			className="flex items-center justify-between py-4 px-4 -mx-4 sticky z-20 flex-shrink-0 bg-white/85 backdrop-blur-2xl"
			style={{ top: 0, paddingTop: 'calc(0.5rem + env(safe-area-inset-top))' }}
		>
			<div className="flex items-center gap-3">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 active:scale-95 transition-transform flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
				<h1 className="text-xl font-bold tracking-tight text-slate-900 truncate max-w-[180px]">{title}</h1>
			</div>
			<div className="flex items-center gap-2">
                {!isFullScreen && (
				    <button 
                        onClick={() => navigate('/ai-assistant')}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 active:scale-95 transition-transform flex-shrink-0">
					    <Sparkles className="w-5 h-5 text-[#009C4D]" />
				    </button>
                )}
                {!isFullScreen && (
                    <button 
                        onClick={() => navigate('/settings')}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 active:scale-95 transition-transform flex-shrink-0">
                        <SettingsIcon className="w-5 h-5 text-slate-600" />
                    </button>
                )}
			</div>
		</header>
	)
}

export default Header
