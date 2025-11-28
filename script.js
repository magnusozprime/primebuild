        // 1. Scroll Reveal Animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        // 2. SHOW MORE LOGIC (Fixed & Robust)
        function showAllFlats() {
            const btn = document.getElementById('showMoreBtn');
            const hiddenFlats = document.querySelectorAll('.extra-flat');

            if (btn) {
                btn.style.display = 'none';
                btn.remove(); // Safely remove element
            }

            if (hiddenFlats.length > 0) {
                hiddenFlats.forEach(flat => {
                    flat.classList.remove('hidden-flats');
                    flat.style.display = 'block';
                    // Animation delay
                    setTimeout(() => {
                        flat.classList.add('reveal', 'active');
                    }, 50);
                });
            }
        }

        // 3. Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            if (menu) {
                menu.classList.toggle('active');
            }
        }

        // 4. Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                const menu = document.getElementById('mobileMenu');
                if (menu) menu.classList.remove('active');
            });
        });

        // 5. AJAX FORM SUBMISSION
        var form = document.getElementById("my-form");
        
        async function handleSubmit(event) {
            event.preventDefault(); // Stop redirect
            var status = document.getElementById("my-form-status");
            var data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = '<span style="color:#4ade80"><i class="fas fa-check-circle"></i> রিকোয়েস্ট পাঠানো হয়েছে!</span>';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = '<span style="color:#f87171">সমস্যা হয়েছে, আবার চেষ্টা করুন।</span>';
                        }
                    });
                }
            }).catch(error => {
                status.innerHTML = '<span style="color:#f87171">ইন্টারনেট সংযোগ নেই।</span>';
            });
        }
        
        if (form) {
            form.addEventListener("submit", handleSubmit);
        }


/// 6. AUTO-COUNT AVAILABLE/SOLD FLATS & UPDATE CARDS (FIXED)
    function updateFlatCounts() {
        // --- PART A: Total Building Count ---
        const totalAvailable = document.querySelectorAll('tbody .is-available').length;
        const totalSold = document.querySelectorAll('tbody .is-booked').length;
        
        const availDisplay = document.getElementById('count-available');
        const soldDisplay = document.getElementById('count-sold');
        if(availDisplay) availDisplay.innerText = totalAvailable;
        if(soldDisplay) soldDisplay.innerText = totalSold;

        // --- PART B: Per Apartment Type Count ---
        // Map Unit Names to Column Indexes (A=1, B=2, etc) and Card IDs
        const unitMap = [
            { colIndex: 1, id: 'stock-unit-a' },
            { colIndex: 2, id: 'stock-unit-b' },
            { colIndex: 3, id: 'stock-unit-c' },
            { colIndex: 4, id: 'stock-unit-d' },
            { colIndex: 5, id: 'stock-unit-e' },
            { colIndex: 6, id: 'stock-unit-f' },
            { colIndex: 7, id: 'stock-unit-g' }
        ];

        const rows = document.querySelectorAll('.status-table tbody tr');

        unitMap.forEach(unit => {
            let count = 0;
            // Loop through every floor to count availability for this specific column
            rows.forEach(row => {
                const cell = row.children[unit.colIndex];
                if (cell && cell.querySelector('.is-available')) {
                    count++;
                }
            });

            // Update the Card Badge
            const badge = document.getElementById(unit.id);
            if (badge) {
                if (count > 0) {
                    badge.innerHTML = `<i class="fas fa-check-circle"></i> ${count} Available`;
                    badge.className = 'stock-badge in-stock';
                } else {
                    badge.innerHTML = `<i class="fas fa-times-circle"></i> Sold Out`;
                    badge.className = 'stock-badge out-stock';
                }
            }
        });
    }

    // Run this function immediately when page loads
    updateFlatCounts();



    // 7. AUTO SELECT UNIT IN FORM
    function contactForUnit(unitName) {
        // 1. Find the dropdown
        const selector = document.getElementById('unit-selector');
        
        // 2. Set the value
        if (selector) {
            selector.value = unitName;
        }

        // 3. Scroll smoothly to the contact section
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
