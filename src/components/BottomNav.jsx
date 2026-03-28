import { NavLink } from 'react-router-dom'
import { Home, PieChart, WalletCards } from 'lucide-react'

const tabs = [
	{ to: '/', icon: Home, label: 'Главная' },
	{ to: '/analytics', icon: PieChart, label: 'Аналитика' },
	{ to: '/budget', icon: WalletCards, label: 'Бюджет' },
]

const BottomNav = () => {
	return (
		<nav
			className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2"
			style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
		>
			<div className="flex items-center justify-around">
				{tabs.map(({ to, icon: Icon, label }) => (
					<NavLink
						key={to}
						to={to}
						end={to === '/'}
						className={({ isActive }) =>
							`flex flex-col items-center gap-1 transition-colors py-1 ${
								isActive ? 'text-[#009C4D]' : 'text-slate-400 hover:text-slate-600'
							}`
						}
					>
						{({ isActive }) => (
							<>
								<Icon className={`w-6 h-6 ${isActive ? 'fill-[#009C4D]/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
								<span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
									{label}
								</span>
							</>
						)}
					</NavLink>
				))}
			</div>
		</nav>
	)
}

export default BottomNav
