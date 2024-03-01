import { validateWorker } from "../model/validationSChema.js";
import Worker from "../model/worker.js";
import httpStatus from "http-status";

export const createWorker = async (req, res) => {
    const { error } = validateWorker(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message
    });
  }
  const {
    firstName,
    lastName,
    email,
    level1,
    supervisor,
    superCommissionPermitted,
    street,
    location,
    iban,
  } = req.body;

  try {
    const workerExist = await Worker.findOne({ email: email });
    if (workerExist) {
      res.status(httpStatus.FORBIDDEN).json({
        status: "error",
        payload: "Worker with this email already exists",
      });
      return;
    }
    let level2 = null;
    let level3 = null;
    if (level1) {
      const level1Worker = await Worker.findById(level1);
      if (level1Worker) {
        level2 = level1Worker.level1;
        if (level2) {
          const level2Worker = await Worker.findById(level2);
          level3 = level2Worker ? level2Worker.level1 : null;
        }
      }
    }
    
    const workerData = {
        firstName,
        lastName,
        email,
        level1,
        street,
        location,
        iban,
        superCommissionPermitted
      };
      if (supervisor !== null) {
      workerData.supervisor = supervisor;
    }
    if (level1 !== null) {
      workerData.level1 = level1;
    }

    const worker = await Worker.create(workerData);
    res.status(httpStatus.OK).json({
      status: "success",
      payload: worker,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};

export const editWorker = async (req, res) => {
  const workerId = req.params.id;
  const {
    firstName,
    lastName,
    email,
    street,
    location,
    iban,
    level1,
    supervisor,
    superCommissionPermitted,
  } = req.body;

  try {
    const worker = await Worker.findById({ _id: workerId });
    if (!worker) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: `worker with the ID:${workerId} does not exist`,
      });
      return;
    }

    const editedWorker = await Worker.findByIdAndUpdate(
      workerId,
      {
        firstName,
        lastName,
        email,
        street,
        location,
        iban,
        level1,
        supervisor,
        superCommissionPermitted,
      },
      { new: true }
    );
    res.status(httpStatus.OK).json({
      status: "success",
      payload: editedWorker,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.message,
    });
  }
};
