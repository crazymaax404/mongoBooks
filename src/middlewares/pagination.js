import { IncorrectRequest } from "../errors/incorrectRequest.js";

export const pagination = async (req, res, next) => {
  try {
    let { maxPage = 10, page = 1, order = "_id:-1" } = req.query;

    let [orderField, orderType] = order.split(":");

    maxPage = parseInt(maxPage);
    page = parseInt(page);
    orderType = parseInt(orderType);

    const result = req.result;

    if (page > 0 && maxPage > 0) {
      const paginatedResult = await result
        .find({})
        .sort({ [orderField]: orderType })
        .skip((page - 1) * maxPage)
        .limit(maxPage)
      res.status(200).json(paginatedResult);
    } else {
      next(new IncorrectRequest());
    }
  } catch (error) {
    next(error);
  }
};
