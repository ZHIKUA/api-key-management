function autoRenewal(dbService) {
    setInterval(()=>{
        dbService.resetDailyUsage();
    }, 24 * 60 * 60)
}