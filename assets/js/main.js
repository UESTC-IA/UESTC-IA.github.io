document.addEventListener("DOMContentLoaded", function() {
    console.log("Main.js loaded: Initializing Navbar...");

    // 1. 注入导航栏 (Navbar)
    // 注意：移动端按钮现在使用 SVG，不再依赖 FontAwesome
    const navbarHTML = `
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 glass-effect border-b border-slate-200/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <a href="index.html" class="flex-shrink-0 flex items-center gap-3 group">
                    <img src="assets/images/logo.png" class="w-8 h-8 rounded-full object-cover shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform" alt="UESTC IA Logo" onerror="this.style.display='none'">
                    <span class="font-bold text-lg tracking-tight text-slate-800">UESTC <span class="text-cyan-600">IA</span></span>
                </a>

                <div class="hidden md:flex space-x-8 items-center">
                    <a href="index.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">首页</a>
                    <a href="partners.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">团队与合作</a>
                    <a href="research.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">核心方向</a>
                    <a href="events.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">活动</a>
                    <a href="projects.html" class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition nav-link">成果</a>
                    <a href="join.html" class="bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-cyan-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">加入我们</a>
                </div>

                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-slate-600 hover:text-cyan-600 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition">
                        <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl absolute w-full left-0 top-16 z-40">
            <div class="px-4 pt-4 pb-6 space-y-2 flex flex-col">
                <a href="index.html" class="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition">首页</a>
                <a href="partners.html" class="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition">团队与合作</a>
                <a href="research.html" class="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition">核心方向</a>
                <a href="events.html" class="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition">活动</a>
                <a href="projects.html" class="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition">成果</a>
                <a href="join.html" class="block px-4 py-3 mt-4 text-center rounded-lg text-base font-medium bg-slate-800 text-white hover:bg-cyan-600 shadow-md transition">加入我们</a>
            </div>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 2. 绑定交互事件
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');

    if (btn && menu) {
        console.log("Mobile menu elements found, attaching listener.");
        btn.addEventListener('click', () => {
            // 切换菜单显示
            menu.classList.toggle('hidden');
            
            // 切换图标显示
            if (menu.classList.contains('hidden')) {
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            } else {
                iconMenu.classList.add('hidden');
                iconClose.classList.remove('hidden');
            }
        });
    } else {
        console.error("Error: Mobile menu button not found via JS.");
    }

    // 3. 注入页脚 (Footer) - 保持不变
    const footerHTML = `
    <footer class="bg-slate-900 text-slate-500 py-12 mt-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
                <span class="text-slate-300 font-bold tracking-wider">UESTC IA</span>
                <span class="mx-2 text-slate-700">|</span>
                <span class="text-xs">电子科技大学交叉学科协会 © 2025 Website Built by Zhixu</span>
            </div>
            <div class="flex space-x-6 text-sm">
                <a href="#" class="hover:text-cyan-400 transition">关于我们</a>
                <a href="#" class="hover:text-cyan-400 transition">联系方式</a>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});