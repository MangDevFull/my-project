import React, { useEffect } from "react"
import Layout from "./Layout"
import LayoutAuthen from "./LayoutAuthen"
interface Props {
    children: React.ReactNode
}
const LayoutIndex: React.FC<Props> = (props: Props) => {
    if (localStorage.getItem("myProjectToken")) {
        return (
            <div>
                <Layout>
                    {props.children}
                </Layout>
            </div>
        )
    } else {
        return (
            <div>
                <LayoutAuthen>
                    {props.children}
                </LayoutAuthen>
            </div>
        )
    }
}
export default LayoutIndex