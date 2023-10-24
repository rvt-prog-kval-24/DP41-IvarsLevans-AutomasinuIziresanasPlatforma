import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

interface TailwindConfig extends Config {
  darkMode: "class";
  content: string[];
  theme: {
    container: {
      center: boolean;
      padding: string;
      screens: {
        "2xl": string;
      };
    };
    extend: {
      colors: {
        border: string;
        input: string;
        ring: string;
        background: string;
        foreground: string;
        primary: {
          DEFAULT: string;
          foreground: string;
        };
        secondary: {
          DEFAULT: string;
          foreground: string;
        };
        destructive: {
          DEFAULT: string;
          foreground: string;
        };
        muted: {
          DEFAULT: string;
          foreground: string;
        };
        accent: {
          DEFAULT: string;
          foreground: string;
        };
        popover: {
          DEFAULT: string;
          foreground: string;
        };
        card: {
          DEFAULT: string;
          foreground: string;
        };
      };
      borderRadius: {
        lg: string;
        md: string;
        sm: string;
      };
      fontFamily: {
        sans: string[];
      };
      keyframes: {
        "accordion-down": {
          from: { height: string };
          to: { height: string };
        };
        "accordion-up": {
          from: { height: string };
          to: { height: string };
        };
      };
      animation: {
        "accordion-down": string;
        "accordion-up": string;
      };
    };
  };
  plugins: any[];
}

const config: TailwindConfig = {
  darkMode: "class",
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Helvetica", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
