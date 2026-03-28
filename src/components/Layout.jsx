import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

const Layout = () => {
	const location = useLocation()
	const isFullScreen = ['/transactions', '/settings', '/ai-assistant'].includes(location.pathname)

	return (
		<div className="max-w-md mx-auto bg-[#f5f8f7] h-[100dvh] flex flex-col shadow-xl relative overflow-hidden">
			{/* Scrollable content area */}
			<div
				id="main-scroll"
				className={`flex-1 overflow-y-auto scroll-touch no-scrollbar ${isFullScreen ? '' : 'pb-20'}`}
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<div className="px-4">
					<Header />
					<main className="space-y-6 pb-6">
						<Outlet />
					</main>
				</div>
			</div>
			{!isFullScreen && <BottomNav />}
		</div>
	)
}

export default Layout
