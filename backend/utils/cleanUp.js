const cron = require("node-cron");
const PendingUser = require("../models/pendingUser"); // Adjust based on your project structure

// Define and schedule the cron job
const scheduleCleanupJob = () => {
    cron.schedule("0 0 * * *", async () => {
        console.log("Running scheduled cleanup task for unverified users...");

        // Set cutoff time to 24 hours ago
        const cutoffTime = new Date();
        cutoffTime.setHours(cutoffTime.getHours() - 24); // 24 hours ago

        try {
            const result = await PendingUser.deleteMany({ 
                isVerified: false, 
                createdAt: { $lt: cutoffTime } 
            });
            console.log(`Cleanup complete. Deleted ${result.deletedCount} unverified users.`);
        } catch (error) {
            console.error("Error during cleanup task:", error);
        }
    });
};

module.exports = scheduleCleanupJob;
