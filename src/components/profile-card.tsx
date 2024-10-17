import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Role, Certificate } from "@prisma/client"

interface ProfileCardProps {
  name: string | null
  email: string
  role: Role
  image: string | null
  creditPoints: number
  certificates: Certificate[]
}

export function ProfileCard({ name, email, role, image, creditPoints, certificates }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={image || undefined} alt={name || "User"} />
            <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{name || "Anonymous User"}</h2>
            <p className="text-muted-foreground">{email}</p>
            <p className="text-muted-foreground capitalize">{role.toLowerCase()}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <h3 className="font-semibold mb-2">Credit Points</h3>
        <p>{creditPoints}</p>
        <Separator className="my-4" />
        <h3 className="font-semibold mb-2">Certificates</h3>
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div key={cert.id} className="mb-2">
              <Badge variant="secondary" className="mr-2">{cert.achievement}</Badge>
              <span className="text-sm text-muted-foreground">
                Issued on {new Date(cert.dateIssued).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p>No certificates earned yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
