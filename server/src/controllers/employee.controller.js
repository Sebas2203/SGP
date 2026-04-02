import { EmployeeMethods } from "../models/employee.model.js";

//controlador para mostrar las solicitudes de un empleado en especifico (recibe el ID de dicho usuario)
export const employeeID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeMethods.employeeID(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//controlador para filtrar las solicitudes de un empleado en especifico solicitud
export const leaveID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeMethods.leaveID(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
