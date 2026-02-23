// Profile Page Script

async function initProfile() {
    if (!storageManager.isUserLoggedIn()) {
        document.getElementById('profileContainer').style.display = 'none';
        document.getElementById('notLoggedIn').style.display = 'block';
        return;
    }

    displayProfile();
    setupResetButton();
}

function displayProfile() {
    const currentUser = storageManager.getCurrentUser();
    const stats = storageManager.getUserStats();

    const profileHeader = document.getElementById('profileHeader');
    profileHeader.innerHTML = `
        <h2 class="profile-username">${currentUser}</h2>
        <p class="en">Member since ${new Date().toLocaleDateString()}</p>
        <p class="te" style="display:none;">సభ్యుని నుండి ${new Date().toLocaleDateString('te-IN')}</p>
    `;

    document.getElementById('totalAnime').textContent = stats.total;
    document.getElementById('watchingAnime').textContent = stats.watching;
    document.getElementById('completedAnime').textContent = stats.completed;

    languageManager.applyLanguage();
}

function setupResetButton() {
    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) {
        resetBtn.style.display = 'block';
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all your watchlist data? This cannot be undone.')) {
                storageManager.resetUserData();
                alert('All data has been reset');
                location.reload();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initProfile);
