"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "nvhrsolutions@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 7624801340",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Kukatpally, Hyderabad, Telangana, India",
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Fri: 9:00 AM - 9:00 PM",
    },
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const nextValue = id === "phone" ? value.replace(/\D/g, "") : value;
    setFormData(prev => ({
      ...prev,
      [id]: nextValue
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Use FormData to avoid CORS preflight; Apps Script can read e.parameter
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("message", formData.message);

      // Google Apps Script web app URL
      const response = await fetch("https://script.google.com/macros/s/AKfycbyFgs-kjWTTTKH-USIcCaGvnxtgCP2yBtbYMQ3F8cmCwgs1BgNgozbyb1DNeGBD2P-w/exec", {
        method: "POST",
        body: payload,
      });

      let wasSuccessful = response.ok;
      try {
        const maybeJson = await response.clone().json();
        wasSuccessful = wasSuccessful || !!maybeJson?.success;
      } catch {}

      if (wasSuccessful) {
        setSubmitStatus("success");
        setSubmitMessage("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset status after 5 seconds
  const resetStatus = () => {
    setTimeout(() => {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }, 5000);
  };

  // Auto-reset status when it changes
  if (submitStatus !== "idle") {
    resetStatus();
  }

  return (
    <section id="contact" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Reach Out To Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your HR operations? Get in touch
            with our experts and let's discuss how we can help
            your organization thrive.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-2"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="mt-2"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="mt-2"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your HR needs and how we can help..."
                      className="mt-2 min-h-32"
                      required
                    />
                  </motion.div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 text-sm">{submitMessage}</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 text-sm">{submitMessage}</span>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're here to help you build a better workplace.
                Whether you need strategic HR consulting, talent
                acquisition support, or organizational
                transformation guidance, our team is ready to
                assist.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {info.title}
                  </h4>
                  <p className="text-gray-600">
                    {info.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}