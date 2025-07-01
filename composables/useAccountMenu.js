export const useAccountMenu = () => {
    const accountMenuItems = [
        {
            name: 'Siparişlerim',
            link: '/hesap/siparislerim',
            icon: 'i-heroicons-shopping-bag',
            description: 'Sipariş geçmişini görüntüle',
            color: 'blue'
        },
        {
            name: 'Adreslerim', 
            link: '/hesap/adreslerim',
            icon: 'i-heroicons-map-pin',
            description: 'Teslimat adreslerini yönet',
            color: 'green'
        },
        {
            name: 'Sorularım',
            link: '/hesap/sorularim',
            icon: 'i-heroicons-question-mark-circle',
            description: 'Soru ve cevapları görüntüle',
            color: 'amber'
        },

    ]

    // Aktif sayfa kontrolü
    const getActiveItem = (currentPath) => {
        return accountMenuItems.find(item => {
            // Exact match veya nested route kontrolü
            return currentPath === item.link || currentPath.startsWith(item.link + '/')
        })
    }

    // İkon renk sınıflarını get et
    const getIconColorClasses = (color, isActive = false, isHover = false) => {
        const colorMap = {
            blue: {
                bg: isActive ? 'bg-blue-500' : 'bg-blue-100 dark:bg-blue-900/30',
                bgHover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50',
                text: 'text-blue-600 dark:text-blue-400'
            },
            green: {
                bg: isActive ? 'bg-green-500' : 'bg-green-100 dark:bg-green-900/30',
                bgHover: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/50',
                text: 'text-green-600 dark:text-green-400'
            },
            amber: {
                bg: isActive ? 'bg-amber-500' : 'bg-amber-100 dark:bg-amber-900/30',
                bgHover: 'group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50',
                text: 'text-amber-600 dark:text-amber-400'
            },
            purple: {
                bg: isActive ? 'bg-purple-500' : 'bg-purple-100 dark:bg-purple-900/30',
                bgHover: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50',
                text: 'text-purple-600 dark:text-purple-400'
            }
        }

        return colorMap[color] || colorMap.blue
    }

    // Menü için gerekli utility fonksiyonlar
    const getMenuIcon = (menuName) => {
        const item = accountMenuItems.find(item => item.name === menuName)
        return item?.icon || 'i-heroicons-document'
    }

    return {
        accountMenuItems,
        getActiveItem,
        getIconColorClasses,
        getMenuIcon
    }
} 