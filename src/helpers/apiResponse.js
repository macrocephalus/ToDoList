const successResponse = function (res, msg) {
	const data = {
		status: true,
		message: msg
	};

	return res.status(200).json(data);
};

const successResponseWithData = function (res, msg, data) {
	const resData = {
		status: true,
		message: msg,
		data: data
	};

	return res.status(200).json(resData);
};

const errorResponse = function (res, msg) {
	const data = {
		status: false,
		message: msg,
	};

	return res.status(500).json(data);
};

const notFoundResponse = function (res, msg) {
	const data = {
		status: false,
		message: msg,
	};

	return res.status(404).json(data);
};

const validationErrorWithData = function (res, msg, data) {
	const resData = {
		status: false,
		message: msg,
		data: data
	};
	
	return res.status(400).json(resData);
};

module.exports = {
	successResponse,
	successResponseWithData,
	errorResponse,
	validationErrorWithData,
	notFoundResponse
};