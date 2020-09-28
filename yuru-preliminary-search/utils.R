# utils.R - some utility functions
# @author: Yu-Ru Lin (yuruliny@gmail.com)
# @date: 2020-08-01

library(readr)
library(ggplot2)
library(tidyverse)
library(dplyr)
library(ggrepel)
library(hrbrthemes)
library(cowplot)
library(ggcorrplot)
library(ggpubr)
library(readr)
library(RColorBrewer)
library(plotly)
library(igraph)
library(disparityfilter)
library(ggnetwork)
library(tidytext)
library(stringr)
library(lubridate)
library(magrittr)



setwd("~/connect/picsogit/grief2action")

knitr::opts_chunk$set(
  echo=TRUE,
  cache=TRUE,
  message=FALSE,
  warning=FALSE,
  # Note that if you remove this the default value of 'Rmarkdown plot' will be used instead.
  fig.cap=NULL,
  dpi = 150
)
for (package in c('ggplot2')) {
  suppressPackageStartupMessages(library(package, character.only=TRUE))
}
# ggplot2::theme_set(theme_classic(base_size = 10))
ggplot2::theme_set(theme_ipsum(grid = F, axis=T, ticks=T, base_size = 10, axis_title_just = "c"))


scale_rank <- function(y) rank(y, ties.method='min', na.last = 'keep') / length(y)


plot_combined_2d_by_group <- function(df, xvar, yvar, groupvar, log_x=F, log_y=F, mainplot='scatter', 
                                      xlab=NULL, ylab=NULL,
                                      xlim=NULL, ylim=NULL,
                                      # xlim=c(0,NA), ylim=c(0,NA),
                                      xtext=0, ytext=1,
                                      dot_alpha=.5, dot_size=1, fill_alpha=.4,
                                      mypal = NULL) {
  if (is.null(mypal)) mypal = brewer.pal(n=6, name = "Set1")
  
  layer0 <- function() {
    list(scale_color_manual(values = mypal),
         scale_fill_manual(values = mypal),
         theme_bw(base_size = 8, , base_family = 'Arial Narrow'),
         theme(plot.margin = margin())
    )
  }
  layer1 <- function() {
    list(scale_color_manual(values = mypal),
         scale_fill_manual(values = mypal),
         theme_void(base_size = 8, , base_family = 'Arial Narrow'),
         theme(plot.margin = margin())
    )
  }
  layer00 <- function() {
    list(scale_color_manual(values = mypal),
         scale_fill_manual(values = mypal),
         theme_bw(base_size = 8, , base_family = 'Arial Narrow'),
         theme(plot.margin = margin())
    )
  }
  layer11 <- function() {
    list(scale_color_manual(values = mypal),
         scale_fill_manual(values = mypal),
         theme_void(base_size = 8, , base_family = 'Arial Narrow'),
         theme(plot.margin = margin())
    )
  }
  
  # Set up scatterplot
  if (mainplot == 'scatter') {
    scatterplot <- ggplot(df, 
                          aes_string(x = xvar, y = yvar, color = groupvar) 
                          # aes(x = (!! xvar), y = (!! yvar), color = (!! groupvar) )
    ) +
      geom_point(size = dot_size, alpha = dot_alpha, shape=21) +
      geom_smooth(method=gam) +
      guides(color = FALSE) 
    # if (log_x) scatterplot = scatterplot + scale_x_log10()
    # if (log_y) scatterplot = scatterplot + scale_y_log10()
  } else if (mainplot == 'scatter1') {
    scatterplot = ggscatter(df, x = xvar, y = yvar, alpha=dot_alpha, color= groupvar, size=1, shape=21, fill=NA, 
                            add = "reg.line",  # Add regressin line
                            # add.params = list(), # Customize reg. line
                            conf.int = TRUE # Add confidence interval
    ) +
      stat_cor(method = "spearman", #label.x = xtext, label.y = ytext, 
               label.x.npc = 'left', label.y.npc = 'top',
               size=2) +
      guides(color = FALSE, fill = F)
    if (!is.null(xlim) && !is.null(ylim)) scatterplot = scatterplot + lims(y=ylim,x=xlim) 
  } else if (mainplot == 'scatter0') {
    scatterplot = ggscatter(df, x = xvar, y = yvar, alpha=dot_alpha, color= groupvar, size=1, shape=21, fill=NA, 
                            # add = "loess",  # Add regressin line
                            add.params = list(), # Customize reg. line
                            conf.int = TRUE # Add confidence interval
    ) +
      stat_cor(method = "spearman", #label.x = xtext, label.y = ytext, 
               label.x.npc = 'left', label.y.npc = 'top',
               size=2) +
      guides(color = FALSE, fill = F)
    if (!is.null(xlim) && !is.null(ylim)) scatterplot = scatterplot + lims(y=ylim,x=xlim) 
  } else {
    contour_plot <- ggplot(df, 
                           aes_string(x = xvar, y = yvar, color = groupvar) 
                           # aes(x = (!! xvar), y = (!! yvar), color = (!! groupvar) )
    ) +
      stat_density_2d(aes(alpha = ..level..) ) +
      guides(color = FALSE, alpha = FALSE) 
    # if (log_x & log_y) contour_plot = contour_plot + coord_trans(x="log10", y="log10")
    # if (log_x & !log_y) contour_plot = contour_plot + coord_trans(x="log10")
    # if (!log_x & log_y) contour_plot = contour_plot + coord_trans(y="log10")
    
    scatterplot = contour_plot
  }
  if (log_x) scatterplot = scatterplot + scale_x_log10()
  if (log_y) scatterplot = scatterplot + scale_y_log10()
  if (!is.null(xlab) || !is.null(ylab)) scatterplot = scatterplot + labs(x=xlab, y=ylab)
  
  scatterplot = scatterplot + layer00()
  
  
  
  
  
  # Define marginal histogram
  marginal_distribution <- function(df, var, groupvar, log_x=F) {
    p = ggplot(df, aes_string(x = var, fill = groupvar) ) +
      # geom_histogram(alpha = 0.4, position = "identity") +
      geom_density(alpha = fill_alpha, size = 0.1) +
      guides(fill = FALSE) +
      layer11()
    
    if (log_x) p = p + scale_x_log10()
    p
  }
  
  # Set up marginal histograms
  x_hist <- marginal_distribution(df, xvar, groupvar, log_x)
  y_hist <- marginal_distribution(df, yvar, groupvar, log_y) +
    coord_flip()
  
  # Align histograms with scatterplot
  aligned_x_hist <- align_plots(x_hist, scatterplot, align = "v")[[1]]
  aligned_y_hist <- align_plots(y_hist, scatterplot, align = "h")[[1]]
  
  # Arrange plots
  cowplot::plot_grid(
    aligned_x_hist
    , NULL
    , scatterplot
    , aligned_y_hist
    , ncol = 2
    , nrow = 2
    , rel_heights = c(0.2, 1)
    , rel_widths = c(1, 0.2)
  )
}