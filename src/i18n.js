import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            downloader: "Downloader",
            features: "Features",
            how_it_works: "How It Works",
            faq: "FAQ",
            cta: "Start Downloading"
          },
          hero: {
            badge: "Free · No Watermark · No Account Needed",
            title: "Save Any Video",
            title_gradient: "In Seconds.",
            desc: "Download HD content from Instagram, TikTok, and more instantly. No watermarks, no limits. 🚀"
          },
          stats: {
            downloads: "Downloads Served",
            platforms: "Platforms Supported",
            users: "Active Users",
            success: "Success Rate"
          },
          downloader_box: {
            title: "Smart Downloader",
            paste: "Paste",
            button: "Download Now"
          },
          how_works: {
            badge: "Simple Process",
            title: "How ViralSaver Works",
            desc: "Three simple steps to download any video from the internet.",
            step1_title: "Copy the Link",
            step1_desc: "Find your video on Instagram, TikTok, YouTube or any supported platform and copy its URL.",
            step2_title: "Paste & Detect",
            step2_desc: "Paste the URL into ViralSaver. We instantly detect the platform and prepare your file.",
            step3_title: "Download Instantly",
            step3_desc: "Choose your format — HD, SD or MP3 — and download to your device in one click."
          },
          why_us: {
            badge: "Why Us",
            title: "Why Choose ViralSaver?",
            desc: "The fastest, cleanest, most reliable social media downloader on the web.",
            feat1_title: "Lightning Fast",
            feat1_desc: "Fetch and download media in seconds with our optimized global API infrastructure.",
            feat2_title: "No Watermarks",
            feat2_desc: "Get clean, original-quality files without any branding overlays or compression.",
            feat3_title: "10+ Platforms",
            feat3_desc: "Supports Instagram, TikTok, Facebook, YouTube, Twitter, Pinterest and more.",
            feat4_title: "Multiple Formats",
            feat4_desc: "Choose HD video, SD video, or audio-only MP3 downloads instantly — always free."
          },
          platforms: {
            title: "Supported Platforms",
            desc: "Download from all the biggest social networks"
          },
          faq_section: {
            badge: "FAQ",
            title: "Frequently Asked Questions",
            q1: "Is ViralSaver completely free to use?",
            q2: "Which platforms are supported?",
            q3: "Are there watermarks on downloaded videos?",
            q4: "Do I need to create an account?",
            q5: "Is it legal to download videos?"
          },
          footer: {
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            contact: "Contact",
            dmca: "DMCA",
            dev: "تطوير وكود",
            rights: "Respect creators' rights. For personal use only."
          }
        }
      },
      ar: {
        translation: {
          nav: {
            downloader: "أداة التحميل",
            features: "المميزات",
            how_it_works: "كيف يعمل",
            faq: "الأسئلة الشائعة",
            cta: "ابدأ التحميل"
          },
          hero: {
            badge: "مجاني · بدون علامة مائية · لا يتطلب حساباً",
            title: "احفظ أي فيديو",
            title_gradient: "في ثوانٍ معدودة.",
            desc: "قم بتنزيل محتوى عالي الدقة من إنستغرام، تيك توك، والمزيد فوراً. بدون علامات مائية وبدون حدود. 🚀"
          },
          stats: {
            downloads: "عمليات تحميل ناجحة",
            platforms: "منصات مدعومة",
            users: "مستخدم نشط",
            success: "نسبة النجاح"
          },
          downloader_box: {
            title: "المحمل الذكي",
            paste: "لصق",
            button: "حمل الآن"
          },
          how_works: {
            badge: "عملية بسيطة",
            title: "كيف يعمل ViralSaver",
            desc: "ثلاث خطوات بسيطة لتحميل أي فيديو من الإنترنت.",
            step1_title: "انسخ الرابط",
            step1_desc: "ابحث عن الفيديو الخاص بك على إنستغرام، تيك توك، يوتيوب أو أي منصة مدعومة وقم بنسخ الرابط.",
            step2_title: "الصق واكتشف",
            step2_desc: "قم بلصق الرابط في ViralSaver. سنقوم بالتعرف على المنصة وتجهيز ملفك فوراً.",
            step3_title: "حمل فوراً",
            step3_desc: "اختر الجودة المطلوبة — HD أو SD أو MP3 — وحمل الملف إلى جهازك بضغطة واحدة."
          },
          why_us: {
            badge: "لماذا نحن؟",
            title: "لماذا تختار ViralSaver؟",
            desc: "أسرع وأبسط وأكثر محمل وسائط موثوقية على الويب.",
            feat1_title: "سرعة فائقة",
            feat1_desc: "جلب وتنزيل الوسائط في ثوانٍ بفضل بنيتنا التحتية العالمية والمتطورة.",
            feat2_title: "بدون علامات مائية",
            feat2_desc: "احصل على ملفات نظيفة وبجودتها الأصلية بدون أي شعارات أو ضغط للملف.",
            feat3_title: "أكثر من 10 منصات",
            feat3_desc: "دعم كامل لإنستغرام، تيك توك، فيسبوك، يوتيوب، تويتر، بينتيريست وغيرها.",
            feat4_title: "صيغ متعددة",
            feat4_desc: "اختر بين فيديو عالي الدقة، جودة متوسطة، أو ملف صوتي MP3 — دائماً مجاناً."
          },
          platforms: {
            title: "المنصات المدعومة",
            desc: "حمل من أكبر شبكات التواصل الاجتماعي"
          },
          faq_section: {
            badge: "الأسئلة الشائعة",
            title: "الأسئلة المتكررة",
            q1: "هل ViralSaver مجاني تماماً؟",
            q2: "ما هي المنصات المدعومة؟",
            q3: "هل توجد علامات مائية على الفيديوهات المحملة؟",
            q4: "هل أحتاج لإنشاء حساب؟",
            q5: "هل تحميل الفيديوهات قانوني؟"
          },
          footer: {
            privacy: "سياسة الخصوصية",
            terms: "شروط الخدمة",
            contact: "اتصل بنا",
            dmca: "حقوق النشر",
            dev: "تطوير وكود زيد مؤدب",
            rights: "احترم حقوق المبدعين. للاستخدام الشخصي فقط."
          }
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;