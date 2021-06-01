export const actionTypes = {
  UPDATE_SOCKET: 'UPDATE_SOCKET',
};

export function updateSocket(socket) {
  return {
    type: actionTypes.UPDATE_SOCKET,
    socket,
  };
}
