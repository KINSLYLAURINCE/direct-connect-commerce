export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  available: boolean;
  features: string[];
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "cloud", name: "Cloud Solutions", icon: "☁️", count: 12 },
  { id: "security", name: "Cybersecurity", icon: "🔒", count: 8 },
  { id: "devops", name: "DevOps Tools", icon: "⚙️", count: 15 },
  { id: "ai", name: "AI & ML", icon: "🤖", count: 10 },
  { id: "networking", name: "Networking", icon: "🌐", count: 7 },
  { id: "storage", name: "Data Storage", icon: "💾", count: 9 },
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "CloudScale Pro",
    description: "Enterprise-grade cloud infrastructure with auto-scaling, load balancing, and 99.99% uptime guarantee.",
    price: 299,
    category: "cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    badge: "Best Seller",
    available: true,
    features: ["Auto-scaling", "Load Balancing", "99.99% Uptime", "24/7 Support"],
    specs: { "Bandwidth": "Unlimited", "Storage": "500GB SSD", "RAM": "32GB", "vCPUs": "8" },
  },
  {
    id: "prod-002",
    name: "SecureVault Enterprise",
    description: "Advanced cybersecurity suite with real-time threat detection and zero-trust architecture.",
    price: 499,
    category: "security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
    badge: "New",
    available: true,
    features: ["Zero-Trust", "Real-time Monitoring", "AI Threat Detection", "Compliance Ready"],
    specs: { "Endpoints": "Unlimited", "Scan Frequency": "Real-time", "Encryption": "AES-256", "SOC": "Type 2" },
  },
  {
    id: "prod-003",
    name: "DevPipeline Suite",
    description: "Complete CI/CD pipeline solution with container orchestration and automated deployments.",
    price: 199,
    category: "devops",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    available: true,
    features: ["CI/CD Pipelines", "Docker Support", "Kubernetes Ready", "Git Integration"],
    specs: { "Pipelines": "Unlimited", "Build Time": "5min avg", "Containers": "100+", "Registries": "All major" },
  },
  {
    id: "prod-004",
    name: "NeuralEngine AI",
    description: "Machine learning platform with pre-built models, training pipelines, and inference APIs.",
    price: 799,
    category: "ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    badge: "Premium",
    available: true,
    features: ["Pre-built Models", "Custom Training", "API Gateway", "Edge Deployment"],
    specs: { "Models": "200+", "GPU": "A100 Clusters", "Latency": "<10ms", "Languages": "40+" },
  },
  {
    id: "prod-005",
    name: "NetMesh Ultra",
    description: "Software-defined networking with global mesh connectivity and intelligent routing.",
    price: 349,
    category: "networking",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    available: true,
    features: ["SD-WAN", "Mesh Network", "Smart Routing", "DDoS Protection"],
    specs: { "Throughput": "100Gbps", "PoPs": "200+", "Latency": "<5ms", "Protocols": "All" },
  },
  {
    id: "prod-006",
    name: "DataLake Infinity",
    description: "Scalable data storage with real-time analytics, data warehousing, and ETL pipelines.",
    price: 449,
    category: "storage",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    badge: "Popular",
    available: true,
    features: ["Petabyte Scale", "Real-time Analytics", "ETL Pipelines", "Multi-region"],
    specs: { "Storage": "Unlimited", "Query Speed": "<1s", "Formats": "All major", "Replicas": "3x" },
  },
  {
    id: "prod-007",
    name: "CloudWatch Monitor",
    description: "Comprehensive observability platform with metrics, logs, and distributed tracing.",
    price: 159,
    category: "cloud",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    available: true,
    features: ["Metrics Dashboard", "Log Aggregation", "Distributed Tracing", "Alerting"],
    specs: { "Retention": "13 months", "Metrics": "Unlimited", "Alerts": "Custom rules", "Integrations": "300+" },
  },
  {
    id: "prod-008",
    name: "ContainerForge",
    description: "Container management platform with auto-scaling Kubernetes clusters and GitOps workflows.",
    price: 279,
    category: "devops",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    badge: "Trending",
    available: false,
    features: ["K8s Management", "GitOps", "Auto-scaling", "Service Mesh"],
    specs: { "Clusters": "Unlimited", "Nodes": "500+", "Uptime": "99.99%", "Support": "24/7" },
  },
];

export const teamMembers = [
  { name: "Sarah Mitchell", role: "CEO & Founder", description: "15+ years in cloud infrastructure and enterprise solutions.", linkedin: "#" },
  { name: "James Chen", role: "CTO", description: "Former AWS architect. Expert in distributed systems.", linkedin: "#" },
  { name: "Amara Osei", role: "VP of Engineering", description: "Led engineering teams at Google and Microsoft.", linkedin: "#" },
  { name: "David Rodriguez", role: "Head of Sales", description: "Driven $50M+ in enterprise technology revenue.", linkedin: "#" },
];

export const stats = [
  { label: "Enterprise Clients", value: 2500, suffix: "+" },
  { label: "Countries Served", value: 45, suffix: "" },
  { label: "Uptime Guarantee", value: 99.99, suffix: "%" },
  { label: "Support Response", value: 15, suffix: "min" },
];

export const trustBadges = [
  "SOC 2 Certified",
  "ISO 27001",
  "GDPR Compliant",
  "PCI DSS Level 1",
  "AWS Partner",
  "Azure Partner",
];
