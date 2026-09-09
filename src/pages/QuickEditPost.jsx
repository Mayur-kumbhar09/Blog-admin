import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Autocomplete,
  InputAdornment,
} from "@mui/material";

import {
  SaveRounded,
  CloseRounded,
  DeleteOutlineRounded,
  DraftsOutlined,
  EditRounded,
  CalendarMonthRounded,
  PersonOutlineRounded,
  CategoryOutlined,
  ArticleOutlined,
  CheckCircleRounded,
  AutoAwesomeRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { usePost } from "./PostContext";

const CATEGORIES = [
  "Adtech",
  "Advocacy, Loyalty & Referrals",
  "Business/Customer Intelligence & Data Science",
  "Channel, Partner & Local Marketing",
  "Chatbots & Conversational AI",
  "CMS & Web Experience Management",
  "CRM",
  "Customer Experience, Service & Success",
  "Digital advertising",
  "Digital marketing",
  "Ecommerce",
  "Influencer",
  "Market Intelligence",
  "Marketing Analytics, Performance & Attribution",
  "Performance marketing",
  "SEO",
];

const AUTHORS = [
  "Mayur kumbhar",
  "GlobeNewswire",
  "Adtech",
  "Ecommerce",
  "Customer Experience, Service & Success",
  "Business/Customer Intelligence & Data Science",
  "Influencer",
  "SEO",
  "Digital marketing",
];

const STATUSES = ["Published", "Draft", "Scheduled"];

const EMPTY_FORM = {
  title: "",
  category: "",
  author: "",
  status: "Published",
  date: null,
};

const QuickEditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { updatePost, draftNews, trashNews } = usePost();

  // Data sent from navigate()
  const record = location.state?.news;

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const recordId = record?.key ?? record?.id ?? null;

  // Load record into form
  useEffect(() => {
    if (!record) {
      setFormData(EMPTY_FORM);
      return;
    }

    const date = record.date ? dayjs(record.date) : null;

    setFormData({
      title: record.title || "",
      category: record.categories || record.category || "",
      author: record.authors || record.author || "",
      status: record.status || "Published",
      date: date?.isValid() ? date : null,
    });
  }, [record]);

  // Form change
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Close page
  const handleClose = () => {
    if (loading) return;

    navigate(-1);
  };

  // Save
  const handleSave = () => {
    if (!recordId) return;

    const title = formData.title.trim();

    if (!title) return;

    setLoading(true);

    updatePost({
      key: recordId,
      title,
      authors: formData.author,
      categories: formData.category,
      status: formData.status,
      date: formData.date?.isValid()
        ? formData.date.format("YYYY-MM-DD")
        : null,
    });

    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 300);
  };

  // Draft
  const handleDraft = () => {
    if (!recordId || loading) return;

    draftNews(recordId);
    navigate(-1);
  };

  // Trash
  const handleTrash = () => {
    if (!recordId || loading) return;

    const confirmed = window.confirm(
      "Are you sure you want to move this post to Trash?"
    );

    if (!confirmed) return;

    trashNews(recordId);
    navigate(-1);
  };

  // Category options
  const categoryOptions = useMemo(() => {
    return [
      ...new Set(
        [...CATEGORIES, formData.category].filter(Boolean)
      ),
    ];
  }, [formData.category]);

  // Author options
  const authorOptions = useMemo(() => {
    return [
      ...new Set(
        [...AUTHORS, formData.author].filter(Boolean)
      ),
    ];
  }, [formData.author]);

  // Status style
  const statusStyle = {
    Published: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
    },
    Draft: {
      backgroundColor: "#fff3e0",
      color: "#ed6c02",
    },
    Scheduled: {
      backgroundColor: "#e3f2fd",
      color: "#1976d2",
    },
  };

  // No record
  if (!recordId) {
    return (
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.08), transparent 30%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.08), transparent 30%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 440,
            p: 4,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid rgba(99,102,241,0.12)",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 24px 70px rgba(15,23,42,0.10)",
            animation: "emptyEnter .45s ease-out",

            "@keyframes emptyEnter": {
              from: {
                opacity: 0,
                transform: "translateY(20px) scale(.97)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0) scale(1)",
              },
            },
          }}
        >
          <Box
            sx={{
              width: 76,
              height: 76,
              mx: "auto",
              mb: 2,
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #eef2ff, #dbeafe)",
              position: "relative",

              "&::after": {
                content: '""',
                position: "absolute",
                inset: -6,
                borderRadius: "28px",
                border: "1px solid rgba(99,102,241,.15)",
                animation: "emptyPulse 2s ease-in-out infinite",
              },

              "@keyframes emptyPulse": {
                "0%,100%": {
                  transform: "scale(1)",
                  opacity: 0.7,
                },
                "50%": {
                  transform: "scale(1.08)",
                  opacity: 0.2,
                },
              },
            }}
          >
            <ArticleOutlined
              sx={{
                fontSize: 38,
                color: "#6366f1",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 800,
              color: "#172033",
              mb: 0.5,
            }}
          >
            No post selected
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              mb: 2.5,
            }}
          >
            Select a post from your dashboard to start editing.
          </Typography>

          <Button
            onClick={handleClose}
            endIcon={<ArrowForwardRounded />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2.5,
              px: 2.5,
              background:
                "linear-gradient(135deg, #4f46e5, #2563eb)",
              color: "#fff",
              boxShadow:
                "0 8px 22px rgba(79,70,229,.22)",

              "&:hover": {
                color: "#fff",
                transform: "translateY(-2px)",
                boxShadow:
                  "0 12px 28px rgba(79,70,229,.30)",
              },

              transition: "all .25s ease",
            }}
          >
            Back to Posts
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },
        position: "relative",
        overflow: "hidden",

        background:
          "radial-gradient(circle at 15% 10%, rgba(99,102,241,.08), transparent 28%), radial-gradient(circle at 90% 85%, rgba(14,165,233,.08), transparent 30%)",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(99,102,241,.10), rgba(59,130,246,.02))",
          top: -100,
          right: -100,
          filter: "blur(2px)",
          animation: "floatOrb 8s ease-in-out infinite",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(14,165,233,.07), rgba(99,102,241,.01))",
          bottom: -80,
          left: -70,
          animation: "floatOrbReverse 10s ease-in-out infinite",
        },

        "@keyframes floatOrb": {
          "0%,100%": {
            transform: "translate(0,0)",
          },
          "50%": {
            transform: "translate(-18px,20px)",
          },
        },

        "@keyframes floatOrbReverse": {
          "0%,100%": {
            transform: "translate(0,0)",
          },
          "50%": {
            transform: "translate(20px,-15px)",
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 470,
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: {
            xs: 3,
            sm: 4,
          },

          background:
            "linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,250,255,.98))",

          border:
            "1px solid rgba(99,102,241,.12)",

          boxShadow:
            "0 25px 80px rgba(15,23,42,.14), 0 4px 14px rgba(79,70,229,.05)",

          animation:
            "quickEditEnter .45s cubic-bezier(.22,1,.36,1)",

          "@keyframes quickEditEnter": {
            from: {
              opacity: 0,
              transform:
                "translateY(18px) scale(.97)",
            },
            to: {
              opacity: 1,
              transform:
                "translateY(0) scale(1)",
            },
          },

          "@media (max-width: 480px)": {
            maxWidth: "calc(100vw - 20px)",
          },
        }}
      >
        {/* =========================================
            HEADER
        ========================================= */}
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            py: 2.2,
            position: "relative",
            overflow: "hidden",

            background:
              "linear-gradient(135deg, #eef2ff 0%, #f5f7ff 45%, #eaf4ff 100%)",

            borderBottom:
              "1px solid rgba(99,102,241,.10)",

            "&::before": {
              content: '""',
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              right: -55,
              top: -85,
              background:
                "linear-gradient(135deg, rgba(99,102,241,.14), rgba(59,130,246,.02))",
              animation: "headerOrb 6s ease-in-out infinite",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              right: 65,
              bottom: -65,
              background:
                "rgba(59,130,246,.07)",
              filter: "blur(2px)",
            },

            "@keyframes headerOrb": {
              "0%,100%": {
                transform: "translate(0,0) scale(1)",
              },
              "50%": {
                transform:
                  "translate(-10px,12px) scale(1.08)",
              },
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",

                background:
                  "linear-gradient(135deg, #4f46e5, #2563eb)",

                color: "#fff",

                boxShadow:
                  "0 10px 24px rgba(79,70,229,.25)",

                position: "relative",

                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: -4,
                  borderRadius: "17px",
                  border:
                    "1px solid rgba(99,102,241,.18)",
                  animation:
                    "iconPulse 2.5s ease-in-out infinite",
                },

                "@keyframes iconPulse": {
                  "0%,100%": {
                    opacity: 0.5,
                    transform: "scale(1)",
                  },
                  "50%": {
                    opacity: 0,
                    transform: "scale(1.18)",
                  },
                },

                "& svg": {
                  fontSize: 23,
                },
              }}
            >
              <EditRounded />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={0.7}
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 15,
                      sm: 16,
                    },
                    fontWeight: 800,
                    letterSpacing: "-.2px",
                    color: "#172033",
                  }}
                >
                  Quick Edit
                </Typography>

                <AutoAwesomeRounded
                  sx={{
                    fontSize: 15,
                    color: "#6366f1",
                    animation:
                      "sparkle 2s ease-in-out infinite",
                  }}
                />
              </Stack>

              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "#64748b",
                  mt: 0.2,
                }}
              >
                Update your post information
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Close">
            <IconButton
              size="small"
              onClick={handleClose}
              disabled={loading}
              sx={{
                position: "absolute",
                zIndex: 3,
                top: 12,
                right: 12,

                width: 32,
                height: 32,

                color: "#64748b",

                backgroundColor:
                  "rgba(255,255,255,.65)",

                border:
                  "1px solid rgba(15,23,42,.06)",

                transition:
                  "all .25s cubic-bezier(.22,1,.36,1)",

                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#ef4444",
                  transform: "rotate(90deg)",
                  boxShadow:
                    "0 6px 16px rgba(15,23,42,.10)",
                },
              }}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* =========================================
            POST INFORMATION
        ========================================= */}
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            pt: 1.8,
            pb: 0.5,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Stack
              direction="row"
              spacing={0.7}
              alignItems="center"
              sx={{
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#6366f1",
                  boxShadow:
                    "0 0 0 4px rgba(99,102,241,.10)",
                }}
              />

              <Typography
                sx={{
                  fontSize: 10.5,
                  color: "#64748b",
                  fontWeight: 700,
                  letterSpacing: ".5px",
                  whiteSpace: "nowrap",
                }}
              >
                POST ID
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#334155",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                #{recordId}
              </Typography>
            </Stack>

            <Chip
              icon={
                formData.status === "Published" ? (
                  <CheckCircleRounded />
                ) : undefined
              }
              label={formData.status}
              size="small"
              sx={{
                height: 25,
                fontSize: 10.5,
                fontWeight: 700,
                borderRadius: 2,
                flexShrink: 0,

                backgroundColor:
                  statusStyle[formData.status]
                    ?.backgroundColor ||
                  "#f5f5f5",

                color:
                  statusStyle[formData.status]?.color ||
                  "#616161",

                border:
                  "1px solid rgba(0,0,0,.04)",

                "& .MuiChip-icon": {
                  fontSize: 14,
                  color:
                    statusStyle[formData.status]
                      ?.color,
                },

                "& .MuiChip-label": {
                  px: 1,
                },

                animation:
                  "statusAppear .3s ease-out",

                "@keyframes statusAppear": {
                  from: {
                    opacity: 0,
                    transform: "scale(.85)",
                  },
                  to: {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            />
          </Stack>
        </Box>

        {/* =========================================
            FORM
        ========================================= */}
        <Box
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
            },

            display: "flex",
            flexDirection: "column",
            gap: 1.8,

            "& .MuiTextField-root": {
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor:
                  "rgba(255,255,255,.75)",

                transition:
                  "all .25s cubic-bezier(.22,1,.36,1)",

                "& fieldset": {
                  borderColor:
                    "rgba(15,23,42,.10)",
                },

                "&:hover fieldset": {
                  borderColor:
                    "rgba(99,102,241,.35)",
                },

                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow:
                    "0 0 0 4px rgba(99,102,241,.08)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root": {
                fontSize: 13,
                color: "#64748b",
              },

              "& .MuiInputBase-input": {
                fontSize: 13,
              },
            },

            "& .MuiAutocomplete-root": {
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor:
                  "rgba(255,255,255,.75)",

                transition:
                  "all .25s cubic-bezier(.22,1,.36,1)",

                "& fieldset": {
                  borderColor:
                    "rgba(15,23,42,.10)",
                },

                "&:hover fieldset": {
                  borderColor:
                    "rgba(99,102,241,.35)",
                },

                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow:
                    "0 0 0 4px rgba(99,102,241,.08)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                },
              },

              "& .MuiInputLabel-root": {
                fontSize: 13,
                color: "#64748b",
              },

              "& .MuiInputBase-input": {
                fontSize: 13,
              },
            },
          }}
        >
          {/* Title */}
          <TextField
            fullWidth
            size="small"
            label="Post Title"
            value={formData.title}
            onChange={(event) =>
              handleChange(
                "title",
                event.target.value
              )
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ArticleOutlined
                    sx={{
                      color: "#6366f1",
                      fontSize: 19,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Date */}
          <TextField
            fullWidth
            size="small"
            label="Publish Date"
            type="date"
            value={
              formData.date?.isValid()
                ? formData.date.format("YYYY-MM-DD")
                : ""
            }
            onChange={(event) => {
              const value = event.target.value;

              handleChange(
                "date",
                value ? dayjs(value) : null
              );
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthRounded
                    sx={{
                      color: "#0ea5e9",
                      fontSize: 19,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Category */}
          <Autocomplete
            fullWidth
            size="small"
            options={categoryOptions}
            value={formData.category || null}
            onChange={(_, value) =>
              handleChange(
                "category",
                value || ""
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <CategoryOutlined
                          sx={{
                            color: "#8b5cf6",
                            fontSize: 19,
                          }}
                        />
                      </InputAdornment>

                      {params.InputProps
                        ?.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Author */}
          <Autocomplete
            fullWidth
            size="small"
            options={authorOptions}
            value={formData.author || null}
            onChange={(_, value) =>
              handleChange(
                "author",
                value || ""
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Author"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <PersonOutlineRounded
                          sx={{
                            color: "#10b981",
                            fontSize: 19,
                          }}
                        />
                      </InputAdornment>

                      {params.InputProps
                        ?.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Status */}
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            value={formData.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value
              )
            }
          >
            {STATUSES.map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{
                  fontSize: 13,
                  borderRadius: 1.5,
                  mx: 0.5,
                  my: 0.2,

                  "&:hover": {
                    backgroundColor:
                      "rgba(99,102,241,.07)",
                  },
                }}
              >
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Divider
          sx={{
            borderColor:
              "rgba(15,23,42,.07)",
          }}
        />

        {/* =========================================
            FOOTER
        ========================================= */}
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            py: 1.6,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            background:
              "linear-gradient(180deg, rgba(248,250,252,.65), rgba(241,245,249,.8))",

            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Stack
            direction="row"
            spacing={0.3}
          >
            <Tooltip title="Move to Draft">
              <Button
                size="small"
                startIcon={<DraftsOutlined />}
                onClick={handleDraft}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#d97706",
                  borderRadius: 2,

                  transition:
                    "all .2s ease",

                  "&:hover": {
                    backgroundColor:
                      "rgba(217,119,6,.08)",
                    transform:
                      "translateY(-1px)",
                  },

                  "& .MuiButton-startIcon": {
                    transition:
                      "transform .2s ease",
                  },

                  "&:hover .MuiButton-startIcon": {
                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                Draft
              </Button>
            </Tooltip>

            <Tooltip title="Move to Trash">
              <Button
                size="small"
                startIcon={
                  <DeleteOutlineRounded />
                }
                onClick={handleTrash}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#dc2626",
                  borderRadius: 2,

                  transition:
                    "all .2s ease",

                  "&:hover": {
                    backgroundColor:
                      "rgba(220,38,38,.07)",
                    transform:
                      "translateY(-1px)",
                  },

                  "& .MuiButton-startIcon": {
                    transition:
                      "transform .2s ease",
                  },

                  "&:hover .MuiButton-startIcon": {
                    transform:
                      "rotate(-8deg) scale(1.1)",
                  },
                }}
              >
                Trash
              </Button>
            </Tooltip>
          </Stack>

          <Stack
            direction="row"
            spacing={0.8}
          >
            <Button
              size="small"
              variant="outlined"
              startIcon={<CloseRounded />}
              onClick={handleClose}
              disabled={loading}
              sx={{
                textTransform: "none",
                borderRadius: 2.2,
                fontWeight: 700,
                color: "#475569",
                borderColor:
                  "rgba(71,85,105,.18)",

                transition:
                  "all .2s ease",

                "&:hover": {
                  borderColor:
                    "rgba(71,85,105,.35)",
                  backgroundColor:
                    "rgba(71,85,105,.04)",
                  transform:
                    "translateY(-1px)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              size="small"
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress
                    size={15}
                    color="inherit"
                  />
                ) : (
                  <SaveRounded />
                )
              }
              disabled={
                loading ||
                !formData.title.trim()
              }
              onClick={handleSave}
              sx={{
                textTransform: "none",
                borderRadius: 2.2,
                fontWeight: 700,
                px: 2,

                background:
                  "linear-gradient(135deg, #4f46e5, #2563eb)",

                boxShadow:
                  "0 7px 18px rgba(79,70,229,.25)",

                transition:
                  "all .25s cubic-bezier(.22,1,.36,1)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4338ca, #1d4ed8)",
                  transform:
                    "translateY(-2px)",
                  boxShadow:
                    "0 11px 25px rgba(79,70,229,.32)",
                },

                "&:active": {
                  transform:
                    "translateY(0) scale(.98)",
                },

                "&.Mui-disabled": {
                  background:
                    "linear-gradient(135deg, #c7d2fe, #bfdbfe)",
                  color:
                    "rgba(255,255,255,.9)",
                  boxShadow: "none",
                },

                "& .MuiButton-startIcon": {
                  transition:
                    "transform .25s ease",
                },

                "&:hover .MuiButton-startIcon": {
                  transform:
                    loading
                      ? "none"
                      : "rotate(-8deg) scale(1.08)",
                },
              }}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuickEditPost;

