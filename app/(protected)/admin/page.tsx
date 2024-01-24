"use client"

import { admin } from "@/actions/admin"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"

const AdminPage = () => {

  const onServerActionClick = () => { 
    admin()
      .then((data)=> { 
        if (data.error) { 
          toast.error(data.error)
        }

        if (data.success) { 
          toast.success(data.success)
        }
      })
  }

  const onApiRouteClick = () => { 
    fetch("/api/admin")
      .then((response) => { 
        if (response.ok) {
          toast.success("Allowed API Route!");
        } else { 
          toast.error("Forbidden API Route!");
        }
      })
  }

  return (
    <div>

    <Card className=" w-[600px]">
        <CardHeader>
          <p className=" text-2xl font-semibold text-center">
            Admin
          </p>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPage