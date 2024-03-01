import httpStatus from "http-status";
export const calculateHierarchy = async (req, res, next) => {
  const { level1 } = req.body;
  
  if (level1) {
    try {
      const level1Worker = await Worker.findById(level1);
      if (level1Worker) {
        const level2 = level1Worker.level1;
        let level3 = null;
        if (level2) {
          const level2Worker = await Worker.findById(level2);
          level3 = level2Worker ? level2Worker.level1 : null;
        }
        req.body.level2 = level2;
        req.body.level3 = level3;
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Error calculating hierarchy",
      });
    }
  }
  
  next();
};
