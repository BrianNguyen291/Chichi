"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConsultationFormProps {
    locale?: string
}

const labels: Record<string, {
    title: string
    subtitle: string
    name: string
    phone: string
    email: string
    campus: string
    course: string
    chooseCampus: string
    chooseCourse: string
    submit: string
}> = {
    vi: {
        title: "ĐĂNG KÍ HỌC – NHẬN TƯ VẤN",
        subtitle: "Để lại thông tin, chúng tôi sẽ liên hệ trong 24h",
        name: "Họ và tên",
        phone: "Số điện thoại",
        email: "Email",
        campus: "Chọn cơ sở",
        course: "Chọn khóa học",
        chooseCampus: "Chọn cơ sở",
        chooseCourse: "Chọn khóa học",
        submit: "Gửi đi"
    },
    "zh-Hant": {
        title: "課程諮詢登記",
        subtitle: "留下聯絡資訊，我們將於24小時內與您聯繫",
        name: "姓名",
        phone: "電話",
        email: "電子郵件",
        campus: "選擇分校",
        course: "選擇課程",
        chooseCampus: "選擇分校",
        chooseCourse: "選擇課程",
        submit: "送出"
    },
    "zh-Hans": {
        title: "课程咨询登记",
        subtitle: "留下联系方式，我们将于24小时内联系您",
        name: "姓名",
        phone: "电话",
        email: "电子邮件",
        campus: "选择分校",
        course: "选择课程",
        chooseCampus: "选择分校",
        chooseCourse: "选择课程",
        submit: "提交"
    },
    en: {
        title: "Register for Consultation",
        subtitle: "Leave your info and we will contact you within 24 hours",
        name: "Full name",
        phone: "Phone",
        email: "Email",
        campus: "Choose campus",
        course: "Choose course",
        chooseCampus: "Choose campus",
        chooseCourse: "Choose course",
        submit: "Submit"
    }
}

const schema = z.object({
    name: z.string().min(2, { message: "Tên quá ngắn" }),
    phone: z.string().min(8, { message: "Số điện thoại không hợp lệ" }),
    email: z.string().email({ message: "Email không hợp lệ" }).optional().or(z.literal("")),
    campus: z.string().min(1, { message: "Vui lòng chọn cơ sở" }),
    course: z.string().min(1, { message: "Vui lòng chọn khóa học" }),
})

export function ConsultationForm({ locale = "vi" }: ConsultationFormProps) {
    const t = labels[locale] || labels.vi

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            campus: "",
            course: "",
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        // Placeholder submit. Replace with API/Google Forms integration.
        toast.success("Đã gửi đăng ký tư vấn! Chúng tôi sẽ liên hệ sớm.")
        form.reset()
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-4 md:p-5 border-b border-gray-100">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
            </div>
            <div className="p-4 md:p-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t.name}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t.name} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t.phone}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t.phone} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t.email}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t.email} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="campus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t.campus}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t.chooseCampus} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="hanoi">Hà Nội</SelectItem>
                                            <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                                            <SelectItem value="taipei">Taipei</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t.course}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t.chooseCourse} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="a0">A0 - Starter</SelectItem>
                                            <SelectItem value="a1">A1 - Beginner</SelectItem>
                                            <SelectItem value="a2">A2 - Elementary</SelectItem>
                                            <SelectItem value="b1">B1 - Intermediate</SelectItem>
                                            <SelectItem value="b2">B2 - Upper Intermediate</SelectItem>
                                            <SelectItem value="c1">C1 - Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                            {t.submit}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ConsultationForm



