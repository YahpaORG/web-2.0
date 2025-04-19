const ONE_HOUR = 36000

export const getFakeRequest = async (delay: number = ONE_HOUR) => {
  await new Promise((resolve) => setTimeout(resolve, delay))

  return { success: true }
}
