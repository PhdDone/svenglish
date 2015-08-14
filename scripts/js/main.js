(function() {
  $(document).ready(function() {
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('a[href*=#]:not([href=#])').click(function() {
      var target;
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        target = $(this.hash);
        target = target.length ? target : $('[name=\' + this.hash.slice(1) + \']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 60
          }, 500);
          return false;
        }
      }
    });
    $('.choice-description.semap').addClass('active');
    $('.choice-title.semap').addClass('active');
    $('.image-container.semap').addClass('active');
    $('.choice').click(function() {
      $('.choice-description').toggleClass('active');
      $('.choice-title').toggleClass('active');
      return $('.image-container').toggleClass('active');
    });
    return $(window).scroll(function() {
      return $('.steps').each(function() {
        var stepsPos, topOfWindow;
        stepsPos = $(this).offset().top;
        topOfWindow = $(window).scrollTop();
        if (stepsPos < topOfWindow + 600) {
          console.log("steps is < topofwindow");
          return setTimeout((function() {
            $('.step1 ').addClass('scaleIn');
            return setTimeout((function() {
              $('.step2').addClass('scaleIn');
              return setTimeout((function() {
                $('.step3').addClass('scaleIn');
                return setTimeout((function() {
                  $('.circlenum.one').addClass('active');
                  $('.step1 .step').addClass('active');
                  return setTimeout((function() {
                    $('.circlenum.two').addClass('active');
                    return setTimeout((function() {
                      $('.circlenum.three').addClass('active');
                      return setTimeout((function() {
                        return $('.row.currently').addClass('scaleIn');
                      }), 500);
                    }), 450);
                  }), 400);
                }), 350);
              }), 250);
            }), 150);
          }), 50);
        }
      });
    });
  });

}).call(this);

(function() {
  var aspect, drag, dragstart, force, height, network, networksvg, preserveAspectRatio, svg, viewBox, width;

  width = 960;

  height = 500;

  viewBox = "0 0 960 500";

  preserveAspectRatio = "xMidYMid";

  aspect = width / height;

  network = $("#network");

  force = d3.layout.force().linkDistance(20).linkStrength(1).size([width, height]);

  dragstart = function(d) {
    return d3.select(this).classed("colored", true);
  };

  drag = force.drag().on("dragstart", dragstart);

  svg = d3.select(network.selector).append('svg').attr('width', width).attr('height', height).attr('viewBox', viewBox).attr('preserveAspectRatio', preserveAspectRatio).attr('id', 'networksvg');

  networksvg = $("#networksvg");

  console.log(networksvg);

  d3.json('/data/miserables-old.json', function(error, graph) {
    var bilinks, link, links, node, nodes;
    if (error) {
      throw error;
    }
    nodes = graph.nodes.slice();
    links = [];
    bilinks = [];
    graph.links.forEach(function(link) {
      var i, s, t;
      s = nodes[link.source];
      console.log(s);
      t = nodes[link.target];
      i = {};
      nodes.push(i);
      links.push({
        source: s,
        target: i
      }, {
        source: i,
        target: t
      });
      bilinks.push([s, i, t]);
    });
    force.nodes(nodes).links(links).start();
    link = svg.selectAll('.link').data(bilinks).enter().append('path').attr('class', 'link');
    node = svg.selectAll('.node').data(graph.nodes).enter().append('circle').attr('class', 'node').attr('r', function(d) {
      if (d.group <= 5) {
        return d.group + 5;
      } else {
        return d.group - 5;
      }
    }).style('fill', function(d) {
      var alpha, dg, rgba;
      if (d.group === 0 || d.group === 1) {
        dg = 2;
      } else {
        dg = d.group;
      }
      alpha = .1 * dg;
      rgba = "rgba(255,255,255," + alpha + ")";
      return rgba;
    }).call(drag);
    node.append('title').text(function(d) {
      return d.name;
    });
    force.on('tick', function() {
      link.attr('d', function(d) {
        return 'M' + d[0].x + ',' + d[0].y + 'S' + d[1].x + ',' + d[1].y + ' ' + d[2].x + ',' + d[2].y;
      });
      node.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    });
  });

  $(window).on('resize', function() {
    var targetHeight, targetWidth;
    targetWidth = $("#index-banner").width();
    targetHeight = $("#index-banner").height();
    networksvg.attr('width', targetWidth);
    networksvg.attr('height', targetHeight);
  }).trigger('resize');

}).call(this);

(function() {
  var click, flatten, force, h, maxNodeSize, nodeTransform, preserveAspectRatio, root, teamgraph, teamgraphsvg, update, viewBox, vis, w, x_browser, y_browser;

  w = 800;

  h = 800;

  viewBox = "0 0 800 800";

  preserveAspectRatio = "xMidYMid";

  maxNodeSize = 50;

  x_browser = 20;

  y_browser = 25;

  root = void 0;

  vis = void 0;

  force = d3.layout.force();

  teamgraph = $("#teamgraph");

  vis = d3.select('#teamgraph').append('svg').attr('width', w).attr('height', h).attr('id', 'teamgraphsvg').attr('viewBox', viewBox).attr('preserveAspectRatio', preserveAspectRatio);

  teamgraphsvg = $("#teamgraphsvg");

  console.log(teamgraphsvg);

  d3.json('/data/team.json', function(json) {
    var defs;
    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = h / 2;
    defs = vis.insert('svg:defs').data(['end']);
    defs.enter().append('svg:path').attr('d', 'M0,-5L10,0L0,5');
    update();
  });

  update = function() {
    var images, links, logo, node, nodeEnter, nodes, path, setEvents, tick;
    nodes = flatten(root);
    links = d3.layout.tree().links(nodes);
    tick = function() {
      path.attr('d', function(d) {
        var dr, dx, dy;
        dx = d.target.x - d.source.x;
        dy = d.target.y - d.source.y;
        dr = 0;
        return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
      });
      node.attr('transform', nodeTransform);
    };
    force.nodes(nodes).links(links).gravity(0.05).charge(-1500).linkDistance(150).friction(0.5).linkStrength(function(l, i) {
      return 1;
    }).size([w, h]).on('tick', tick).start();
    path = vis.selectAll('path.link').data(links, function(d) {
      return d.target.id;
    });
    path.enter().insert('svg:path').attr('class', 'link').style('stroke', '#fff').style('opacity', 0.5);
    path.exit().remove();
    node = vis.selectAll('g.node').data(nodes, function(d) {
      return d.id;
    });
    nodeEnter = node.enter().append('svg:g').attr('class', 'node').attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    }).on('click', click).call(force.drag);
    nodeEnter.append('svg:circle').attr('r', function(d) {
      return Math.sqrt(d.size) / 10 || 4.5;
    }).style('fill', '#ff9800').style('stroke', '#ffcc80').style('opacity', '0.5');
    logo = nodeEnter.append('svg:image').attr('xlink:href', function(d) {
      return d.logo;
    }).attr('x', function(d) {
      return -40;
    }).attr('y', function(d) {
      return -40;
    }).attr('height', 80).attr('width', 80);
    images = nodeEnter.append('svg:image').attr('xlink:href', function(d) {
      return d.img;
    }).attr('x', function(d) {
      return -25;
    }).attr('y', function(d) {
      return -25;
    }).attr('height', 50).attr('width', 50);
    setEvents = images.on('click', function(d) {
      if (d.hero) {
        d3.select('.matename').html(d.hero);
        d3.select('.matetitle').html(d.group);
        d3.select('.matebio').html(d.bio);
      }
      if (d.link) {
        d3.select('.matelink').html('<a href=\'' + d.link + '\' >' + 'web page ⇢' + '</a>');
      } else {
        d3.select('.matelink').html('');
      }
    }).on('mouseenter', function() {
      d3.select(this).transition().attr('x', function(d) {
        return -60;
      }).attr('y', function(d) {
        return -60;
      }).attr('height', 100).attr('width', 100);
    }).on('mouseleave', function() {
      d3.select(this).transition().attr('x', function(d) {
        return -25;
      }).attr('y', function(d) {
        return -25;
      }).attr('height', 50).attr('width', 50);
    });
    nodeEnter.append('text').attr('class', 'nametag').attr('x', -50).attr('y', 50).attr('fill', '#ff9800').attr("font-size", "30px").text(function(d) {
      return d.hero;
    });
    nodeEnter.append('text').attr('class', 'label').attr('x', -50).attr('y', 10).attr('fill', '#ffcc80').attr("font-size", "20px").text(function(d) {
      return d.name;
    });
    node.exit().remove();
    path = vis.selectAll('path.link');
    node = vis.selectAll('g.node');
  };

  nodeTransform = function(d) {
    d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
    d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
    return 'translate(' + d.x + ',' + d.y + ')';
  };

  click = function(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
  };

  flatten = function(root) {
    var i, nodes, recurse;
    nodes = [];
    i = 0;
    recurse = function(node) {
      if (node.children) {
        node.children.forEach(recurse);
      }
      if (!node.id) {
        node.id = ++i;
      }
      nodes.push(node);
    };
    recurse(root);
    return nodes;
  };

  $(window).on('resize', function() {
    var targetHeight, targetWidth;
    targetWidth = $("#teambox").width();
    targetHeight = $("#teambox").height();
    teamgraphsvg.attr('width', targetWidth);
    teamgraphsvg.attr('height', targetHeight);
  }).trigger('resize');

}).call(this);
