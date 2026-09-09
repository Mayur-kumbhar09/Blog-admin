import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Feed as FeedIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Sell as SellIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const drawerWidth = 250;

/* -------------------------------------------------------------------------- */
/* MOCK USERS                                                                  */
/* -------------------------------------------------------------------------- */

const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    password: "password",
    role: "Admin",
    phone: "9876543210",
  },
  {
    id: 2,
    username: "coworker",
    password: "password",
    role: "Co-worker",
    phone: "9876543211",
  },
  {
    id: 3,
    username: "client01",
    password: "password",
    role: "Client",
    phone: "9876543212",
  },
  {
    id: 4,
    username: "client02",
    password: "password",
    role: "Client",
    phone: "9876543213",
  },
];

/* -------------------------------------------------------------------------- */
/* INITIAL STOCK LEDGER                                                        */
/* -------------------------------------------------------------------------- */

const INITIAL_STOCK_LEDGER = [
  {
    id: 1,
    clientUsername: "client01",
    phoneNumber: "9876543212",
    stockTicker: "AAPL",
    purchaseDate: "2026-08-20",
    saleDate: "",
    status: "Purchased",
    actionTakenBy: "admin",
    updatedAt: "2026-08-30",
  },
  {
    id: 2,
    clientUsername: "client02",
    phoneNumber: "9876543213",
    stockTicker: "TSLA",
    purchaseDate: "2026-08-22",
    saleDate: "",
    status: "Purchased",
    actionTakenBy: "admin",
    updatedAt: "2026-08-29",
  },
  {
    id: 3,
    clientUsername: "client01",
    phoneNumber: "9876543212",
    stockTicker: "GOOGL",
    purchaseDate: "2026-08-10",
    saleDate: "2026-08-25",
    status: "Sold",
    actionTakenBy: "coworker",
    updatedAt: "2026-08-25",
  },
  {
    id: 4,
    clientUsername: "client02",
    phoneNumber: "9876543213",
    stockTicker: "MSFT",
    purchaseDate: "2026-08-05",
    saleDate: "2026-08-18",
    status: "Sold",
    actionTakenBy: "admin",
    updatedAt: "2026-08-18",
  },
];

/* -------------------------------------------------------------------------- */
/* LOGIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const user = MOCK_USERS.find(
      (item) =>
        item.username === username && item.password === password
    );

    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    setError("");
    onLogin(user);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #e0f2fe 100%)",
        px: 2,
      }}
    >
      <Card
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
              }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5" fontWeight={700}>
              Stock Dashboard
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              autoComplete="current-password"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Demo Credentials
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Admin: admin / password
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Co-worker: coworker / password
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR                                                                     */
/* -------------------------------------------------------------------------- */

function Sidebar({
  user,
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
}) {
  const menuItems =
    user.role === "Admin"
      ? [
          {
            label: "Dashboard",
            value: "dashboard",
            icon: <DashboardIcon />,
          },
          {
            label: "User Management",
            value: "users",
            icon: <PeopleIcon />,
          },
          {
            label: "Stock Ledger",
            value: "ledger",
            icon: <AssessmentIcon />,
          },
        ]
      : [
          {
            label: "Dashboard",
            value: "dashboard",
            icon: <DashboardIcon />,
          },
          {
            label: "Client Feed",
            value: "feed",
            icon: <FeedIcon />,
          },
        ];

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Stock Manager
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {user.role} Portal
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.value}
            selected={activePage === item.value}
            onClick={() => {
              setActivePage(item.value);
              setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="body2" fontWeight={600}>
              {user.username}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {user.role}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {content}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {content}
        </Drawer>
      </Box>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* TOP BAR                                                                     */
/* -------------------------------------------------------------------------- */

function TopBar({ user, onLogout, setMobileOpen }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          xs: "100%",
          lg: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          lg: `${drawerWidth}px`,
        },
        bgcolor: "white",
        color: "text.primary",
        boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "inline-flex", lg: "none" }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ flexGrow: 1 }}
        >
          {user.role} Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mr: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          Welcome, <strong>{user.username}</strong>
        </Typography>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

/* -------------------------------------------------------------------------- */
/* DASHBOARD HOME                                                              */
/* -------------------------------------------------------------------------- */

function DashboardHome({ user, ledger }) {
  const totalClients = MOCK_USERS.filter(
    (item) => item.role === "Client"
  ).length;

  const activeStocks = ledger.filter(
    (item) => item.status === "Purchased"
  ).length;

  const soldStocks = ledger.filter(
    (item) => item.status === "Sold"
  ).length;

  const stats =
    user.role === "Admin"
      ? [
          {
            title: "Total Clients",
            value: totalClients,
            icon: <PeopleIcon />,
          },
          {
            title: "Active Stocks",
            value: activeStocks,
            icon: <AssessmentIcon />,
          },
          {
            title: "Sold Stocks",
            value: soldStocks,
            icon: <SellIcon />,
          },
          {
            title: "Ledger Records",
            value: ledger.length,
            icon: <DashboardIcon />,
          },
        ]
      : [
          {
            title: "Recently Updated",
            value: new Set(
              ledger.map((item) => item.clientUsername)
            ).size,
            icon: <FeedIcon />,
          },
          {
            title: "Stocks Available",
            value: activeStocks,
            icon: <AssessmentIcon />,
          },
        ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {user.role === "Admin"
          ? "Overview of users, clients and stock activity."
          : "Overview of your assigned client activity."}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg:
              user.role === "Admin"
                ? "repeat(4, 1fr)"
                : "repeat(2, 1fr)",
          },
          gap: 2,
        }}
      >
        {stats.map((stat) => (
          <Card
            key={stat.title}
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {stat.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ mt: 1 }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.main",
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* USER MANAGEMENT                                                             */
/* -------------------------------------------------------------------------- */

function UserManagement() {
  const users = MOCK_USERS;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        User Management
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        View and manage all system users and clients.
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Username</strong>
              </TableCell>

              <TableCell>
                <strong>Phone Number</strong>
              </TableCell>

              <TableCell>
                <strong>Role</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>

                    {user.username}
                  </Box>
                </TableCell>

                <TableCell>{user.phone}</TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    color={
                      user.role === "Admin"
                        ? "primary"
                        : user.role === "Co-worker"
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label="Active"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* ADMIN STOCK LEDGER                                                          */
/* -------------------------------------------------------------------------- */

function StockLedger({ ledger }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Stock Ledger
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Complete financial and stock timeline available to administrators.
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Client Username</strong>
              </TableCell>

              <TableCell>
                <strong>Phone Number</strong>
              </TableCell>

              <TableCell>
                <strong>Stock Ticker</strong>
              </TableCell>

              <TableCell>
                <strong>Purchase Date</strong>
              </TableCell>

              <TableCell>
                <strong>Sale Date</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell>
                <strong>Action Taken By</strong>
              </TableCell>

              <TableCell>
                <strong>Last Updated</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ledger.map((stock) => (
              <TableRow key={stock.id} hover>
                <TableCell>{stock.clientUsername}</TableCell>

                <TableCell>{stock.phoneNumber}</TableCell>

                <TableCell>
                  <Chip
                    label={stock.stockTicker}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{stock.purchaseDate}</TableCell>

                <TableCell>
                  {stock.saleDate || "—"}
                </TableCell>

                <TableCell>
                  <Chip
                    label={stock.status}
                    size="small"
                    color={
                      stock.status === "Sold"
                        ? "success"
                        : "warning"
                    }
                  />
                </TableCell>

                <TableCell>{stock.actionTakenBy}</TableCell>

                <TableCell>{stock.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* CO-WORKER CLIENT FEED                                                       */
/* -------------------------------------------------------------------------- */

function ClientFeed({ ledger, onLogSale }) {
  const [selectedClient, setSelectedClient] = useState(null);

  /*
   * Only expose client username and phone number.
   *
   * No purchase date, ticker, sale date or historical
   * information is rendered here.
   */
  const recentClients = useMemo(() => {
    const groupedClients = {};

    ledger.forEach((stock) => {
      if (
        !groupedClients[stock.clientUsername] ||
        new Date(stock.updatedAt) >
          new Date(
            groupedClients[stock.clientUsername].updatedAt
          )
      ) {
        groupedClients[stock.clientUsername] = stock;
      }
    });

    return Object.values(groupedClients)
      .sort(
        (a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      )
      .map((stock) => ({
        clientUsername: stock.clientUsername,
        phoneNumber: stock.phoneNumber,
      }));
  }, [ledger]);

  const handleSale = () => {
    if (!selectedClient) return;

    onLogSale(selectedClient.clientUsername);

    setSelectedClient(null);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Client Feed
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Recently updated clients assigned to you.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Historical purchase and financial information is restricted
        for co-workers.
      </Alert>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Client Username</strong>
              </TableCell>

              <TableCell>
                <strong>Phone Number</strong>
              </TableCell>

              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentClients.map((client) => (
              <TableRow key={client.clientUsername} hover>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Avatar sx={{ width: 36, height: 36 }}>
                      <PersonIcon />
                    </Avatar>

                    {client.clientUsername}
                  </Box>
                </TableCell>

                <TableCell>{client.phoneNumber}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<SellIcon />}
                    onClick={() =>
                      setSelectedClient(client)
                    }
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    Log Sale
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {recentClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No recently updated clients.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SALE CONFIRMATION DIALOG */}

      <Dialog
        open={Boolean(selectedClient)}
        onClose={() => setSelectedClient(null)}
      >
        <DialogTitle>Confirm Sale</DialogTitle>

        <DialogContent>
          Are you sure you want to log a sale for{" "}
          <strong>
            {selectedClient?.clientUsername}
          </strong>
          ?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setSelectedClient(null)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleSale}
            sx={{ textTransform: "none" }}
          >
            Confirm Sale
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN APP                                                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("lg")
  );

  const [currentUser, setCurrentUser] = useState(null);

  const [activePage, setActivePage] = useState("dashboard");

  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * This is the central application state.
   *
   * When a co-worker logs a sale, this state changes.
   * If the user subsequently logs in as admin,
   * the admin ledger reads this same updated state.
   */
  const [stockLedger, setStockLedger] = useState(
    INITIAL_STOCK_LEDGER
  );

  /* ------------------------------------------------------------------------ */
  /* LOGIN                                                                     */
  /* ------------------------------------------------------------------------ */

  const handleLogin = (user) => {
    setCurrentUser(user);

    if (user.role === "Admin") {
      setActivePage("dashboard");
    } else {
      setActivePage("dashboard");
    }
  };

  /* ------------------------------------------------------------------------ */
  /* LOGOUT                                                                    */
  /* ------------------------------------------------------------------------ */

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage("dashboard");
    setMobileOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /* LOG SALE                                                                  */
  /* ------------------------------------------------------------------------ */

  const handleLogSale = (clientUsername) => {
    setStockLedger((previousLedger) => {
      /*
       * Find the latest active purchase for this client.
       *
       * In a real application this would come from the backend.
       */
      const activeStockIndex = previousLedger
        .map((item, index) => ({
          ...item,
          originalIndex: index,
        }))
        .filter(
          (item) =>
            item.clientUsername === clientUsername &&
            item.status === "Purchased"
        )
        .sort(
          (a, b) =>
            new Date(b.updatedAt) -
            new Date(a.updatedAt)
        )[0]?.originalIndex;

      if (activeStockIndex === undefined) {
        return previousLedger;
      }

      const updatedLedger = [...previousLedger];

      updatedLedger[activeStockIndex] = {
        ...updatedLedger[activeStockIndex],
        status: "Sold",
        saleDate: new Date().toISOString().split("T")[0],
        actionTakenBy: "coworker",
        updatedAt: new Date().toISOString().split("T")[0],
      };

      return updatedLedger;
    });
  };

  /* ------------------------------------------------------------------------ */
  /* LOGIN SCREEN                                                              */
  /* ------------------------------------------------------------------------ */

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  /* ------------------------------------------------------------------------ */
  /* PAGE CONTENT                                                              */
  /* ------------------------------------------------------------------------ */

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return currentUser.role === "Admin" ? (
          <UserManagement />
        ) : (
          <DashboardHome
            user={currentUser}
            ledger={stockLedger}
          />
        );

      case "ledger":
        return currentUser.role === "Admin" ? (
          <StockLedger ledger={stockLedger} />
        ) : (
          <DashboardHome
            user={currentUser}
            ledger={stockLedger}
          />
        );

      case "feed":
        return currentUser.role === "Co-worker" ? (
          <ClientFeed
            ledger={stockLedger}
            onLogSale={handleLogSale}
          />
        ) : (
          <DashboardHome
            user={currentUser}
            ledger={stockLedger}
          />
        );

      case "dashboard":
      default:
        return (
          <DashboardHome
            user={currentUser}
            ledger={stockLedger}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        user={currentUser}
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <TopBar
        user={currentUser}
        onLogout={handleLogout}
        setMobileOpen={setMobileOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            lg: `calc(100% - ${drawerWidth}px)`,
          },
          minWidth: 0,
          bgcolor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          {renderPage()}
        </Box>
      </Box>
    </Box>
  );
}