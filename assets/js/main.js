document.addEventListener("DOMContentLoaded", function() {
    // 1. 注入导航栏 (Navbar) - 已添加移动端结构
    const navbarHTML = `
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 glass-effect">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <a href="index.html" class="flex-shrink-0 flex items-center gap-3 group">
                    <img src="assets/images/logo.png" class="w-8 h-8 rounded-full object-cover shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform" alt="UESTC IA Logo">
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
                    <button id="mobile-menu-btn" class="text-slate-600 hover:text-cyan-600 focus:outline-none p-2">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full left-0 top-16">
            <div class="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <a href="index.html" class="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition">首页</a>
                <a href="partners.html" class="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition">团队与合作</a>
                <a href="research.html" class="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition">核心方向</a>
                <a href="events.html" class="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition">活动</a>
                <a href="projects.html" class="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition">成果</a>
                <a href="join.html" class="block px-3 py-3 mt-4 text-center rounded-md text-base font-medium bg-slate-800 text-white hover:bg-cyan-600 transition">加入我们</a>
            </div>
        </div>
    </nav>
    `;
    
    // 插入 HTML
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // --- 新增：移动端菜单交互逻辑 ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        
        // 切换图标 (汉堡 -> 叉号)
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // 2. 注入页脚 (Footer) - 保持原样
    const footerHTML = `
    <footer class="bg-slate-900 text-slate-500 py-12 mt-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
                <span class="text-slate-300 font-bold tracking-wider">UESTC IA</span>
                <span class="mx-2 text-slate-700">|</span>
                <span class="text-xs">电子科技大学交叉学科协会 © 2025 website built by zhixu</span>
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