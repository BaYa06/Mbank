import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

const Layout = () => {
	const location = useLocation()
	const isFullScreen = ['/transactions', '/settings', '/ai-assistant'].includes(location.pathname)

	return (
		<div
			className="max-w-md mx-auto bg-[#f5f8f7] flex flex-col shadow-xl relative"
			style={{
				height: '100dvh',
				// Push content below the iOS status bar in standalone PWA mode
				paddingTop: 'env(safe-area-inset-top)',
			}}
		>
			{/* Scrollable content area */}
			<div
				id="main-scroll"
				className={`flex-1 overflow-y-auto scroll-touch no-scrollbar ${isFullScreen ? 'pb-6' : ''}`}
				style={{
					WebkitOverflowScrolling: 'touch',
					// Leave room for bottom nav + home indicator
					paddingBottom: isFullScreen ? undefined : 'calc(5rem + env(safe-area-inset-bottom))',
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
