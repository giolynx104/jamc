import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface AccountSettingsCardProps {
  email: string
}

export function AccountSettingsCard({ email }: AccountSettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={email} readOnly />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="********" />
          </div>
          <Button>Update Settings</Button>
        </form>
      </CardContent>
    </Card>
  )
}
