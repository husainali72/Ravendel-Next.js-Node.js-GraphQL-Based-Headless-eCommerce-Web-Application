import { getProviders } from "next-auth/react"

export default async (req, res) => {
    const providers = await getProviders()
    console.log("Providers", providers)
    res.end()
}