import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

const Layout = () => {
	const location = useLocation()
	const isFullScreen = ['/transactions', '/settings', '/ai-assistant'].includes(location.pathname)

	return (
		<div
			className="max-w-md mx-auto bg-[#f5f8f7] flex flex-col shadow-xl relative"
			style={{ height: '100dvh' }}
		>
			{/* Scrollable content area */}
			<div
				id="main-scroll"
				className="flex-1 overflow-y-auto scroll-touch no-scrollbar"
				style={{
					WebkitOverflowScrolling: 'touch',
					paddingBottom: isFullScreen
						? 'calc(1.5rem + env(safe-area-inset-bottom))'
						: 'calc(5rem + env(safe-area-inset-bottom))',
				}}
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
