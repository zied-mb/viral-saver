const handleDownload = async () => {
    if (!url.trim() || !isValidUrl(url.trim())) {
      if (url.trim()) setError("Please enter a valid URL.");
      return;
    }

    // 🚀 --- Downloader_Pop_Logic Start ---
    const nextCount = clickCount + 1;
    
    if (nextCount >= 3) {
      // ريست للحساب باش يبدا يحسب من جديد للـ 3 الجايين
      setClickCount(0);
      localStorage.setItem("v_saver_clicks", "0");

      if (!hasVisitedMDB) {
        // الـ 3 كليكات الأولى في تاريخ المستعمل (مرة واحدة فقط)
        window.open(MDB_URL, "_blank", "noopener,noreferrer");
        setHasVisitedMDB(true);
        localStorage.setItem("v_saver_seen_mdb", "true");
      } else {
        // بعد ما شاف MDB، أي 3 كليكات يخلطولهم يمشيو للـ Ads
        window.open(ADS_DIRECT_LINK, "_blank", "noopener,noreferrer");
      }
    } else {
      // مازال ما خلطش للـ 3، نزيدو في الحساب
      setClickCount(nextCount);
      localStorage.setItem("v_saver_clicks", nextCount.toString());
    }
    // 🚀 --- Downloader_Pop_Logic End ---

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await fetchDownload(url.trim());
      if (data && ((data as any).error === true || (data as any).status === 404)) {
        setError("PRIVATE_ACCOUNT_DETECTED");
      } else if (data) {
        setResult(data);
        toast.success("Ready to save! 🚀");
      }
    } catch {
      setError("Unable to fetch media. ⚠️");
    } finally {
      setLoading(false);
    }
  };
